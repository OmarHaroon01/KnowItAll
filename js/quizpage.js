var outerRow = document.getElementById("outer-row");
totalQuestions = -1;
correctAnswerList = [];

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

async function preload() {
  let unid = getCookie("userId");
  const resp = await fetch("http://localhost:8080/user/valid-user.php", {
    method: "POST",
    body: JSON.stringify({ unid: unid }),
  });
  const output1 = await resp.json();

  if (!output1.data) {
    window.location.href = "quizlist.html";
  }

  var params = {};
  location.search
    .slice(1)
    .split("&")
    .forEach(function (pair) {
      pair = pair.split("=");
      params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    });

  if (!params["topic"]) {
    window.location.href = "quizlist.html";
  }

  const res = await fetch("http://localhost:8080/home/quizpage.php", {
    method: "POST",
    body: JSON.stringify({ topic: params["topic"] }),
  });
  const out = await res.json();
  const output = out.data;

  aagejabe = false;
  for (var i = 0; i < output.length; i++) {
    if (params["topic"] == output[i].topic) {
      aagejabe = true;
    }
  }

  if (!aagejabe) {
    window.location.href = "quizlist.html";
  }


  totalQuestions = output.length;

  for (var i = 0; i < output.length; i++) {
    correctAnswerList.push(output[i]["answer"]);

    var outerDiv = document.createElement("div");
    outerDiv.classList.add(...["col-12", "col-md-6", "m-3"]);

    var questionNoDiv = document.createElement("div");
    questionNoDiv.classList.add(
      ...["row", "pastel-green", "p-2", "justify-content-center", "text-break"]
    );
    questionNoDiv.innerHTML = "Question " + (i + 1) + "/" + output.length;
    outerDiv.appendChild(questionNoDiv);

    var questionDiv = document.createElement("div");
    questionDiv.classList.add(
      ...[
        "row",
        "pastel-yellow",
        "p-3",
        "justify-content-center",
        "text-break",
        "my-0",
        "h4",
      ]
    );
    questionDiv.innerHTML = output[i].question;
    outerDiv.appendChild(questionDiv);

    var options = [];
    options.push(output[i].optionOne);
    options.push(output[i].optionTwo);
    options.push(output[i].optionThree);
    options.push(output[i].optionFour);

    for (var j = 0; j < 4; j++) {
      var optionDiv = document.createElement("div");
      optionDiv.classList.add(...["row", "bg-white", "card"]);

      var formParent = document.createElement("div");
      formParent.id = "formQuestion" + (i + 1) + "option" + (j + 1);
      formParent.classList.add(...["card-body", "d-inline"]);

      var optionForm = document.createElement("div");
      optionForm.classList.add(...["form-check"]);

      var input = document.createElement("input");
      input.classList.add(...["form-check-input"]);
      input.type = "radio";
      input.id = "question" + (i + 1) + "option" + (j + 1);
      input.name = "question" + (i + 1);
      input.value = "Option " + (j + 1);

      var label = document.createElement("label");
      label.classList.add(...["form-check-label", "card-title", "h5"]);
      label.innerHTML = options[j];
      label.for = input.id;

      optionForm.appendChild(input);
      optionForm.appendChild(label);

      formParent.appendChild(optionForm);
      optionDiv.appendChild(formParent);
      outerDiv.appendChild(optionDiv);
    }

    outerRow.appendChild(outerDiv);
  }
}

window.onload = preload;

async function submitQuizButtonClicked() {

  answersPicked = [];
  optionPicked = [];
  for (var i = 1; i <= totalQuestions; i++) {
    picked = false;
    for (var j = 1; j <= 4; j++) {
      var option = document.getElementById("question" + i + "option" + j);
      if (option.checked) {
        picked = true;
        answersPicked.push(option.value);
        optionPicked.push(j)
      }
    }
    if (!picked) {
      answersPicked.push(null);
      optionPicked.push(null)
    }
  }
  var params = {};
  location.search
    .slice(1)
    .split("&")
    .forEach(function (pair) {
      pair = pair.split("=");
      params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    });
  let unid = getCookie("userId");
  const res = await fetch("http://localhost:8080/home/quizsubmit.php", {
    method: "POST",
    body: JSON.stringify({
      topic: params["topic"],
      answersPicked: answersPicked,
      unid: unid,
      correctAnswer: correctAnswerList,
    }),
  });
  const out = await res.json();
  for (var i = 0; i < correctAnswerList.length; i++) {
    if (correctAnswerList[i] == answersPicked[i]) {
      var formParent = document.getElementById("formQuestion" + (i + 1) + "option" + optionPicked[i]);
      formParent.classList.add(...["text-success", "border", "border-3", "border-success"])
    } else {
      if (optionPicked[i] != null){
      var formParent = document.getElementById("formQuestion" + (i + 1) + "option" + optionPicked[i]);
      formParent.classList.add(...["text-danger", "border", "border-3", "border-danger"])
      }
      var formParent = document.getElementById("formQuestion" + (i + 1) + "option" + correctAnswerList[i][correctAnswerList[i].length - 1]);
      formParent.classList.add(...["text-success", "border", "border-3", "border-success"])
    }
  }


  if (out.data) {
    alert(out.data);
    var submitButton = document.getElementById("submitButton")
    submitButton.classList.add("invisible")
    var closeButton = document.getElementById("closeButton")
    closeButton.classList.remove("invisible")
    // window.location.href = "home.html";
  } else {
    alert(out.error);
    window.location.href = "home.html";
  }


}

function closeButtonClicked() {
  window.location.href = "home.html"
}
