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

{/* <div class="col-6 m-3">
<div class="row pastel-green p-2">
    <div class="text-center text-break">
        Question 5/10
    </div>
</div>
<div class="row p-3 pastel-yellow">
    <div class="text-center h4 text-break">
        What is the capital city of Ukraine?
    </div>
</div>
<div class="row bg-white">
    <div class="card w-60">
        <div class="card-body d-inline">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                <label class="form-check-label" for="flexRadioDefault1">
                    <h5 class="card-title">Dhaka</h5>
                </label>
              </div>
        </div>
    </div>
    <div class="card w-60">
        <div class="card-body d-inline">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                <label class="form-check-label" for="flexRadioDefault2">
                    <h5 class="card-title">Kyiv</h5>
                </label>
              </div>
        </div>
    </div>
    <div class="card w-60">
        <div class="card-body d-inline">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3">
                <label class="form-check-label" for="flexRadioDefault3">
                    <h5 class="card-title">Delhi</h5>
                </label>
              </div>
        </div>
    </div>
    <div class="card w-60">
        <div class="card-body d-inline">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4">
                <label class="form-check-label" for="flexRadioDefault4">
                    <h5 class="card-title">Moscow</h5>
                </label>
              </div>
        </div>
    </div>
</div>
</div> */}