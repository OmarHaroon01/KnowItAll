let passwordInput = document.getElementById("passwordInput");
let errorSpan = document.getElementById("errorSpan");

function accessButtonClicked() {
  const password = "ADMIN";

  if (passwordInput.value == password) {
    window.location.replace("adminhomepage.html");
  } else {
    errorSpan.classList.remove("d-none");
  }
}

function onPasswordInputChanged() {
  errorSpan.classList.add("d-none");
}
