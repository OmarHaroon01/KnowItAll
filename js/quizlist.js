var outerRow = document.getElementById("outer-row")
var topicList = []
var output = []

async function loadingData() {
    LL = new LazyLoad();
    const res = await fetch("http://localhost:8080/home/quizlist.php", {
        method: "POST",
    });
    const out = await res.json();
    output = out["data"];

    for (var i = 0; i < output.length; i++) {

        var div1 = document.createElement("div");
        div1.classList.add("col-12");
        div1.classList.add("col-md-3");
        div1.classList.add("mb-2")

        var div2 = document.createElement("div");
        div2.classList.add("card")
        div2.classList.add("h-100")
        div2.classList.add("border")

        div2.classList.add("border-3")

        div2.classList.add("border-dark")

        var img = document.createElement("img");
        img.classList.add(...["card-img-top", "h-75"])
        img.src = "http://localhost:8080/images/topiclogos/" + output[i]["topicImageLocation"]
        
        if(i > 4)
        {
            img.classList.add("lazy");
            img.setAttribute("data-src", "http://localhost:8080/images/topiclogos/" + output[i]["topicImageLocation"]);
        }

        div2.appendChild(img);

        var div3 = document.createElement("div");
        div3.classList.add("card-body")

        var h5 = document.createElement("h5");
        h5.classList.add("card-title")
        h5.innerHTML = output[i]["topicName"]
        var p = document.createElement("p");
        p.classList.add("card-text")
        p.innerHTML = output[i]["topicDescription"]
        topicList.push(output[i]["topicName"] + ' ' + output[i]["topicDescription"]);

        div3.appendChild(h5);
        div3.appendChild(p);
        div2.appendChild(div3);
        var div4 = document.createElement("div")
        div4.classList.add(...["card-footer", "border-dark", "text-end"])

        var a = document.createElement("a")
        a.setAttribute("href", "quizpage.html?topic="+output[i]["topicName"])
        a.classList.add(...["btn", "btn-success", "w-100"])
        a.innerHTML = "Attempt"

        div4.appendChild(a)
        div2.appendChild(div4);
        div1.appendChild(div2);

        outerRow.appendChild(div1)
    }
}

async function onSearchInput() {
    var searchinput = document.getElementById("searchInputId").value.toLowerCase();
    const res = await fetch("http://localhost:8080/home/search.php", {
      method: "POST",
      body: JSON.stringify({ search: searchinput }),
    });
    const out = await res.json();
    const showTopics = out.data
    outerRow.innerHTML = ""
    for(var i = 0; i < showTopics.length; i++) {
        var div1 = document.createElement("div");
        div1.classList.add("col-12")
        div1.classList.add("col-md-3")
        div1.classList.add("mb-2")

        var div2 = document.createElement("div");
        div2.classList.add("card")
        div2.classList.add("h-100")
        div2.classList.add("border")

        div2.classList.add("border-3")

        div2.classList.add("border-dark")

        var img = document.createElement("img");
        img.classList.add(...["card-img-top", "h-75"])
        img.src = "http://localhost:8080/images/topiclogos/" + showTopics[i]["topicImageLocation"]

        div2.appendChild(img);

        var div3 = document.createElement("div");
        div3.classList.add("card-body")

        var h5 = document.createElement("h5");
        h5.classList.add("card-title")
        h5.innerHTML = showTopics[i]["topicName"]
        var p = document.createElement("p");
        p.classList.add("card-text")
        p.innerHTML = showTopics[i]["topicDescription"]
        //topicList.push(output[showTopics[i]]["topicName"] + ' ' + output[showTopics[i]]["topicDescription"]);

        div3.appendChild(h5);
        div3.appendChild(p);
        div2.appendChild(div3);
        var div4 = document.createElement("div")
        div4.classList.add(...["card-footer", "border-dark", "text-end"])

        var a = document.createElement("a")
        a.setAttribute("href", "quizpage.html?topic="+showTopics[i]["topicName"])
        a.classList.add(...["btn", "btn-success", "w-100"])
        a.innerHTML = "Attempt"

        div4.appendChild(a)
        div2.appendChild(div4);
        div1.appendChild(div2);

        outerRow.appendChild(div1)
    }
}
window.onload = loadingData;