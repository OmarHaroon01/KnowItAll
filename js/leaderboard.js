

async function preLoad() {
    const res = await fetch("http://localhost:8080/home/leaderboard.php", {
        method: "POST",
        body: JSON.stringify({ topic: "Animals" }),
    });
    const output = await res.json();
    const out = output["data"];
    console.log(out)

    for (var i = 0; i < out.length; i++) {
        var rankDiv = document.createElement("div")
        rankDiv.classList.add(...["h4", "mb-0"])
        rankDiv.innerHTML = i + 1;

        var nameDiv = document.createElement("div")
        nameDiv.classList.add(...["h4", "mb-0"])
        nameDiv.innerHTML = out[i].name;

        var scoreDiv = document.createElement("div")
        scoreDiv.classList.add(...["h4", "mb-0"])
        scoreDiv.innerHTML = out[i].score;

    }

    

}

window.onload = preLoad();