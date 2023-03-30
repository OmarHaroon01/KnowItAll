// class Login {
// 	constructor(form, fields) {
// 		this.form = form;
// 		this.fields = fields;
// 		this.validateonSubmit();
// 	}

// 	validateonSubmit() {
// 		let self = this;

// 		this.form.addEventListener("login", (e) => {
// 			e.preventDefault();
// 			var error = 0;
// 			self.fields.forEach((field) => {
// 				const input = document.querySelector(`#${field}`);
// 				if (self.validateFields(input) == false) {
// 					error++;
// 				}
// 			});
// 			if (error == 0) {
// 				// //do login api here
// 				// localStorage.setItem("auth", 1);
// 				// this.form.submit();
// 			}
// 		});
// 	}

// 	validateFields(field) {
// 		if (field.value.trim() === "") {
// 			this.setStatus(
// 				field,
// 				`${field.previousElementSibling.innerText} cannot be blank`,
// 				"error"
// 			);
// 			return false;
// 		} else {
// 			if (field.type == "password") {
// 				if (field.value.length < 8) {
// 					this.setStatus(
// 						field,
// 						`${field.previousElementSibling.innerText} must be at least 8 characters`,
// 						"error"
// 					);
// 					return false;
// 				} else {
// 					this.setStatus(field, null, "success");
// 					return true;
// 				}
// 			} else {
// 				this.setStatus(field, null, "success");
// 				return true;
// 			}
// 		}
// 	}

// 	setStatus(field, message, status) {
// 		const errorMessage = field.parentElement.querySelector(".error-message");

// 		if (status == "success") {
// 			if (errorMessage) {
// 				errorMessage.innerText = "";
// 			}
// 			field.classList.remove("input-error");
// 		}

// 		if (status == "error") {
// 			errorMessage.innerText = message;
// 			field.classList.add("input-error");
// 		}
// 	}
// }

// const form = document.querySelector(".loginForm");
// if (form) {
// 	const fields = ["email", "password"];
// 	const validator = new Login(form, fields);
// }

// var button = document.querySelector('#loginButton'); 

const email = document.getElementById("loginEmail");
const password = document.getElementById("loginPassword");
const spanError = document.getElementById("spanError");

const validate = async () => {

    if(email.value == "" || password.value == "") {
        spanError.classList.remove('d-none');
    }

    const res = await fetch("http://localhost:8080/login.php", {
        method: "POST",
        body: JSON.stringify({ "email": email.value, "password": password.value}) 
    });
    
}

const modify = () => {
    spanError.classList.add('d-none');
    console.log("i am here");
}




