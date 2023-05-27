
let questionInput = document.getElementById("questionInput")
let optionOneInput = document.getElementById("optionOneInput")
let optionTwoInput = document.getElementById("optionTwoInput")
let optionThreeInput = document.getElementById("optionThreeInput")
let optionFourInput = document.getElementById("optionFourInput")
let correctAnswer = document.getElementById("correctAnswer")
var topicID = document.getElementById("topicID")
var form = document.getElementById("form")

if (document.referrer != "http://127.0.0.1:5500/adminhomepage.html") {
  window.location.href = "admin.html";
}


const preloadValues = async () => {
    const res = await fetch("http://localhost:8080/admin/gettopics.php", {
      method: "GET",
    });
    const output = await res.json();

    var select = document.createElement("select");
    select.setAttribute("id", "topicSelect");
    select.classList.add(...["w-50", "fw-bold", "text-center"])
    for (var i = 0; i < output.data.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", output.data[i].topicName);
        option.text = output.data[i].topicName;
        select.appendChild(option);
    }

    topicID.appendChild(select);
}

const addQuestionButtonClicked = async () => {
    var topicInput = document.getElementById("topicSelect")

    if (topicInput.value == "" || questionInput.value == "" || optionOneInput.value == "" || optionTwoInput.value == "" || optionThreeInput.value == "" || optionFourInput.value == "" || correctAnswer.value == "") {
        alert("Please fill out all fields.")
        return
    }

    const res = await fetch("http://localhost:8080/admin/addquestion.php", {
        method: "POST",
        body: JSON.stringify({ "topic": topicInput.value, "question": questionInput.value,
        "optionOne": optionOneInput.value, "optionTwo": optionTwoInput.value,
        "optionThree": optionThreeInput.value, "optionFour": optionFourInput.value, 
        "correctAnswer": correctAnswer.value
    }),
    });
    const output = await res.json();
    alert(output.data)
    form.reset()
}

window.onload = preloadValues;