var outerRow = document.getElementById('outer-row');
totalQuestions = -1;
correctAnswerList = [];


async function preload() {

  var params = {};
  location.search.slice(1).split("&").forEach(function (pair) {
    pair = pair.split("=");
    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  });

  if (!params["topic"]){
    window.location.href = "quizlist.html"
  }

  const res = await fetch("http://localhost:8080/home/quizpage.php", {
    method: "POST",
    body: JSON.stringify({ "topic": params["topic"] }),
  });
  const out = await res.json();
  const output = out.data;

  aagejabe = false;
  for (var i = 0; i < output.length; i++){
    if (params["topic"] == output[i].topic){
      aagejabe = true;
    }
  }

  if (!aagejabe) {
    window.location.href = "quizlist.html"
  }

  console.log(output)
  totalQuestions = output.length;

  for (var i = 0; i < output.length; i++) {

    correctAnswerList.push(output[i]["answer"])

    var outerDiv = document.createElement("div");
    outerDiv.classList.add(...['col-6', 'm-3']);

    var questionNoDiv = document.createElement("div");
    questionNoDiv.classList.add(...['row', 'pastel-green', 'p-2', 'justify-content-center', 'text-break']);
    questionNoDiv.innerHTML = "Question " + (i + 1) + "/" + output.length;
    outerDiv.appendChild(questionNoDiv);

    var questionDiv = document.createElement("div");
    questionDiv.classList.add(...['row', 'pastel-yellow', 'p-3', 'justify-content-center', 'text-break', 'my-0', 'h4']);
    questionDiv.innerHTML = output[i].question;
    outerDiv.appendChild(questionDiv);

    var options = [];
    options.push(output[i].optionOne);
    options.push(output[i].optionTwo);
    options.push(output[i].optionThree);
    options.push(output[i].optionFour);

    for (var j = 0; j < 4; j++) {
      var optionDiv = document.createElement("div");
      optionDiv.classList.add(...['row', 'bg-white', 'card']);


      var formParent = document.createElement("div");
      formParent.classList.add(...['card-body', 'd-inline']);

      var optionForm = document.createElement("div");
      optionForm.classList.add(...['form-check']);

      var input = document.createElement("input");
      input.classList.add(...['form-check-input']);
      input.type = "radio";
      input.id = "question" + (i + 1) + "option" + (j + 1);
      input.name = "question" + (i + 1);
      input.value = "Option " + (j + 1);

      var label = document.createElement("label");
      label.classList.add(...['form-check-label', 'card-title', 'h5']);
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


function submitQuizButtonClicked() {
  answersPicked = [];

  for (var i = 1; i <= totalQuestions; i++) {
    for (var j = 1; j <= 4; j++) {
      var option = document.getElementById("question" + i + "option" + j);
      if (option.checked) {
        // var key = ("Question " + i);
        answersPicked.push(option.value);
      }
    }
  }

  correctAnswer = 0;
  for (var i = 0; i < totalQuestions; i++) {
    if (correctAnswerList[i] == answersPicked[i]) {
      correctAnswer++;
    }
  }



  alert('Your Quiz Result is ' + correctAnswer + "/" + totalQuestions);
  window.location.href = "home.html"
  console.log(answersPicked)
}


   