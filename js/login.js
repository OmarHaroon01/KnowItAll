const email = document.getElementById("loginEmail");
const password = document.getElementById("loginPassword");
const spanError = document.getElementById("spanError");

const validate = async () => {

    if(email.value == "" || password.value == "") {
        spanError.classList.remove('d-none');
        return;
    }
    
    const res = await fetch("http://localhost:8080/auth/login.php", {
        method: "POST",
        body: JSON.stringify({ "email": email.value, "password": password.value}) 
    });
    
    const output = await res.json();

    
    if(output.error) {
        spanError.classList.remove('d-none');
        return;
    }
    console.log(output);
}

const modify = () => {
    spanError.classList.add('d-none');
    console.log("i am here");
}




