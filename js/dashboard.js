let username = document.getElementById("username")
let quizNumber = document.getElementById("quizNumber")
let recentQuiz = document.getElementById("recent-quiz")

window.onload = preLoad;
async function preLoad(){
    const res = await fetch("http://localhost:8080/user/dashboard.php", {
        method: "POST",
        body: JSON.stringify({ "unid": '1'}),
    });
    const output = await res.json();
    console.log(output)
    username.innerHTML = output[0].fullName;
    quizNumber.innerHTML = output.length;
    for (var i = 0; i < output.length; i++) {
        if (!output[i].score){
            recentQuiz.innerHTML = "Please take part in the quiz"
            recentQuiz.classList.add("fs-2")
            return;
        }
        var row = document.createElement("div")
        row.classList.add("row")

        var col1 = document.createElement("div")
        col1.classList.add("col-6")
        var col2 = document.createElement("div")
        col2.classList.add("col-6")

        var topicDiv = document.createElement("div")
        topicDiv.classList.add("fs-3")
        topicDiv.innerHTML = output[i]["topic"]

        var scoreDiv = document.createElement("div")
        scoreDiv.classList.add("fs-3")
        scoreDiv.innerHTML = output[i]["score"]

        col1.appendChild(topicDiv)
        col2.appendChild(scoreDiv)

        row.appendChild(col1)
        row.appendChild(col2)
        row.appendChild(document.createElement("hr"))

        recentQuiz.appendChild(row)
        
    }
}