async function preload() {
    const res = await fetch("http://localhost:8080/home/quizpage.php", {
        method: "POST",
        //currently hardcoded. Will be replaced with the topic selected in quizlist
        body: JSON.stringify({"topic": "ghjk"}),
    });
    const out = await res.json();

    //to show in inspect console
    console.log(out.data[0]["question"]);
}

window.onload = preload;