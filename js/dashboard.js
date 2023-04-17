let username = document.getElementById("username");
let quizNumber = document.getElementById("quizNumber");
let recentQuiz = document.getElementById("recent-quiz");

window.addEventListener("DOMContentLoaded", function () {
  $("#nav-placeholder").load("navbar.html");
  $("#footer-placeholder").load("footer.html");
});

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

const logoutButtonClicked = () => {
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "home.html";
}

window.onload = preLoad;
async function preLoad() {
  let unid = getCookie("userId");
  const res = await fetch("http://localhost:8080/user/dashboard.php", {
    method: "POST",
    body: JSON.stringify({ unid: unid }),
  });
  const output = await res.json();
  console.log(output);
  if (output.length == 0) {
    window.location.href = "home.html"
    return;
  }
  let registerList = document.getElementById("registerList");
  let dashboardButton = document.getElementById("dashboardButton");

  dashboardButton.classList.remove("d-none");
  registerList.classList.add("d-none");



  username.innerHTML = output[0].fullName;
  quizNumber.innerHTML = output.length;
  for (var i = 0; i < output.length; i++) {
    if (!output[i].score) {
      recentQuiz.innerHTML = "Please take part in a quiz";
      recentQuiz.classList.add("fs-5");
      return;
    }
    var row = document.createElement("div");
    row.classList.add("row");

    var col1 = document.createElement("div");
    col1.classList.add("col-6");
    var col2 = document.createElement("div");
    col2.classList.add("col-6");

    var topicDiv = document.createElement("div");
    topicDiv.classList.add("fs-5");
    topicDiv.innerHTML = output[i]["topic"];

    var scoreDiv = document.createElement("div");
    scoreDiv.classList.add("fs-5");
    scoreDiv.innerHTML = output[i]["score"];

    col1.appendChild(topicDiv);
    col2.appendChild(scoreDiv);

    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(document.createElement("hr"));

    recentQuiz.appendChild(row);
  }
}
