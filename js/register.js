let fullnameInput = document.getElementById("fullnameInput")
let emailInput = document.getElementById("emailInput")
let passwordInput = document.getElementById("passwordInput")
let passwordInput2 = document.getElementById("passwordInput2")
let errorMessage = document.getElementById("errorMessage")



function removeError() {
    errorMessage.classList.add("invisible")
}

function emailValidation(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

async function registerButtonClicked() {
    console.log(fullnameInput.value)
    console.log(emailInput.value)
    console.log(passwordInput.value)
    console.log(passwordInput2.value)

    if (fullnameInput.value == "") {
        errorMessage.classList.remove("invisible")
        errorMessage.innerHTML = "Please enter your name first!"
        return
    }
    if (!emailValidation(emailInput.value)) {
        errorMessage.classList.remove("invisible")
        errorMessage.innerHTML = "Please enter a valid Email!"
        return
    }
    if (passwordInput.value == "") {
        errorMessage.classList.remove("invisible")
        errorMessage.innerHTML = "Please enter your Password!"
        return
    }
    if (passwordInput2.value != passwordInput.value) {
        errorMessage.classList.remove("invisible")
        errorMessage.innerHTML = "Passwords don't match"
        return
    }
    const res = await fetch("http://localhost:8080/auth/register.php", {
        method: "POST",
        body: JSON.stringify({
            "fullName": fullnameInput.value, "email": emailInput.value,
            "password": passwordInput.value
        }),
    });
    const output = await res.json();
    if (output.error) {
        errorMessage.classList.remove("invisible")
        errorMessage.innerHTML = output.error
        return
    }
    window.alert(output.data)
    window.location.href = "home.html"


}


