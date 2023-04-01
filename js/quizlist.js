async function loadingData() {
    const res = await fetch("http://localhost:8080/home/quizlist.php", {
        method: "POST",
        body: JSON.stringify({}),
    });
    const output = await res.json();
    output = output["data"];
    console.log(output);

    for (var i = 0; i < output.length; i++) {

        var div1 = document.createElement("div");
        div1.classList.add("col-3")
        div1.classList.add("mb-2")

        var div2 = document.createElement("div");
        div2.classList.add("card")
        div2.classList.add("h-100")
        div2.classList.add("border-dark")

        var div3 = document.createElement("div");
        div3.classList.add("card-body")

        var h5 = document.createElement("h5");
        h5.classList.add("card-title")
        h5.innerHTML = output[i]["topicName"]

        var p = document.createElement("p");
        p.classList.add("card-text")
        p.innerHTML = output[i]["topicDescription"]

        div3.appendChild(h5);
        div3.appendChild(p);







    }
}

window.onload = loadingData;