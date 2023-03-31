let topicInput = document.getElementById("topicInput")
let questionInput = document.getElementById("questionInput")
let optionOneInput = document.getElementById("optionOneInput")
let optionTwoInput = document.getElementById("optionTwoInput")
let optionThreeInput = document.getElementById("optionThreeInput")
let optionFourInput = document.getElementById("optionFourInput")
let correctAnswer = document.getElementById("correctAnswer")

const addQuestionButtonClicked = async () => {
    console.log(topicInput.value)
    console.log(questionInput.value)
    console.log(optionOneInput.value)
    console.log(optionTwoInput.value)
    console.log(optionThreeInput.value)
    console.log(optionFourInput.value)
    console.log(correctAnswer.value)

    const res = await fetch("http://localhost:8080/admin/addquestion.php", {
        method: "POST",
        body: JSON.stringify({ "topic": topicInput.value, "question": questionInput.value,
        "optionOne": optionOneInput.value, "optionTwo": optionTwoInput.value,
        "optionThree": optionThreeInput.value, "optionFour": optionFourInput.value, 
        "correctAnswer": correctAnswer.value
    }),
    });
    const output = await res.json();
    console.log(output)
}