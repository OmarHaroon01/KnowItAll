const email = document.getElementById("loginEmail");
const password = document.getElementById("loginPassword");
const spanError = document.getElementById("spanError");
const rememberMe = document.getElementById("rememberRadioBtn");


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

    if(rememberMe.checked) {
        const d = new Date();
        d.setTime(d.getTime() + (30*86400*1000));
        expiryDate = "expires=" + d.toUTCString();
        document.cookie = "userId=" + output.data + ';' + expiryDate + ';';
        //console.log(expiryDate);
    } else {
        document.cookie = "userId=" + output.data + ';';
    }
    window.location.href = 'home.html';
}

const modify = () => {
    spanError.classList.add('d-none');
}




