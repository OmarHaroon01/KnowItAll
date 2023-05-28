if (document.referrer != "http://127.0.0.1:5500/adminhomepage.html") {
  window.location.href = "admin.html";
}

async function deleteUserButtonClicked() {
    var deleteUserInput = document.getElementById("deleteUserInputId").value

    const res = await fetch("http://localhost:8080/admin/deleteuser.php", {
        method: "POST",
        body: JSON.stringify({ "useremail": deleteUserInput
    })
    });
    const output = await res.json();
    if(output.data) {
        alert(output.data)
    }
    else alert(output.error)
   
    form.reset()
}