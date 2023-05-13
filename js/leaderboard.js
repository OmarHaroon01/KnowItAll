async function preLoad(topic) {
  var params = {};
  location.search
    .slice(1)
    .split("&")
    .forEach(function (pair) {
      pair = pair.split("=");
      params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    });

  if (!params["topic"]) {
    window.location.href = "home.html";
  }

  var selectDiv = document.getElementById("selectDiv");
  const res1 = await fetch("http://localhost:8080/admin/gettopics.php", {
    method: "POST",
  });
  const output1 = await res1.json();

  var select = document.createElement("select");
  select.setAttribute("id", "topicSelect");
  select.classList.add(...["fw-bold", "text-center"]);

  aagejabe = false;

  var option = document.createElement("option");
  option.setAttribute("value", "all");
  option.text = "All";


  if (params["topic"] == "all") {
    aagejabe = true;
    option.selected = true;
  }

    select.appendChild(option);

  for (var i = 0; i < output1.data.length; i++) {
    
    var option = document.createElement("option");
    option.setAttribute("value", output1.data[i].topicName);
    option.text = output1.data[i].topicName;
    if (params["topic"] == output1.data[i].topicName) {
      aagejabe = true;
      option.selected = true;
    }
    select.appendChild(option);
  }

  if (!aagejabe) {
    window.location.href = "home.html";
  }

  selectDiv.appendChild(select);

  select.onchange = async () => {
    window.onload = preLoad(select.value);
    window.location.href = "leaderboard.html?topic=" + select.value;
  };

  var tableDiv = document.getElementById("tableDiv");
  const res = await fetch("http://localhost:8080/home/leaderboard.php", {
    method: "POST",
    body: JSON.stringify({ topic: params["topic"] }),
  });
  const output = await res.json();
  const out = output["data"];
  console.log(out);

  if (out.length == 0) {
    var errorDiv = document.createElement("div");
    errorDiv.classList.add(...["row", "mt-5", "display-6"]);
    errorDiv.innerHTML = "No one has taken this quiz yet.";
    tableDiv.appendChild(errorDiv);
  }

  for (var i = 0; i < out.length; i++) {
    var rankDiv = document.createElement("div");
    rankDiv.classList.add(...["h4", "mb-0"]);
    rankDiv.innerHTML = i + 1;

    var nameDiv = document.createElement("div");
    nameDiv.classList.add(...["h4", "mb-0"]);
    nameDiv.innerHTML = out[i].fullName;

    var scoreDiv = document.createElement("div");
    scoreDiv.classList.add(...["h4", "mb-0"]);
    scoreDiv.innerHTML = out[i].score;

    var topicDiv = document.createElement("div");
    topicDiv.classList.add(...["h4", "mb-0"]);
    topicDiv.innerHTML = out[i].topic;

    var colDiv1 = document.createElement("div");
    colDiv1.classList.add("col-2");
    colDiv1.appendChild(rankDiv);

    var colDiv2 = document.createElement("div");
    colDiv2.classList.add("col-4");
    colDiv2.appendChild(nameDiv);

    var colDiv3 = document.createElement("div");
    colDiv3.classList.add("col-3");
    colDiv3.appendChild(scoreDiv);

    var colDiv4 = document.createElement("div");
    colDiv4.classList.add("col-3");
    colDiv4.appendChild(topicDiv);

    var outerDiv = document.createElement("div");
    outerDiv.classList.add(
      ...[
        "row",
        "justify-content-center",
        "mt-3",
        "leaderboard-color",
        "p-2",
        "text-dark",
      ]
    );

    outerDiv.appendChild(colDiv1);
    outerDiv.appendChild(colDiv2);
    outerDiv.appendChild(colDiv3);
    outerDiv.appendChild(colDiv4);

    tableDiv.appendChild(outerDiv);
  }
}

window.onload = preLoad();
