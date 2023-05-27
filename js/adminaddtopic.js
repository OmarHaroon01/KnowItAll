
if (document.referrer != "http://127.0.0.1:5500/adminhomepage.html") {
  window.location.href = "admin.html";
}

async function addTopicButtonClicked() {
    var topicInput = document.getElementById("topicInputId").value
    var topicDescription = document.getElementById("topicDescriptionId").value
    var topicImage = document.getElementById("topicImageId").files[0]


    if (topicInput == "") {
        alert("Please add a topic!")
        return
    }
    if (!topicImage) {
        alert("Please attach an image!")
        return
    }
    if (topicDescription == "") {
        alert("Please add a description!")
        return
    }

    const formData = new FormData()
    formData.append("topic", topicInput)
    formData.append("image", topicImage)
    formData.append("description", topicDescription)

    const res = await fetch("http://localhost:8080/admin/addtopic.php", {
        method: "POST",
        body: formData
    });
    const output = await res.json();
    if (output.data) {
        alert(output.data)
        window.location.href = "adminhomepage.html";
    } else {
        alert(output.error)
        window.location.href = "adminhomepage.html";
    }
    



}



