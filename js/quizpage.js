var outerRow = document.getElementById('outer-row');

async function preload() {
    const res = await fetch("http://localhost:8080/home/quizpage.php", {
        method: "POST",
        //currently hardcoded. Will be replaced with the topic selected in quizlist
        body: JSON.stringify({ "topic": "ghjk" }),
    });
    const out = await res.json();
    const output = out.data;

    for (var i = 0; i < output.length; i++) {
        var outerDiv = document.createElement("div");
        outerDiv.classList.add(...['col-6', 'm-3']);

        var questionNoDiv = document.createElement("div");
        questionNoDiv.classList.add(...['row', 'pastel-green', 'p-2', 'justify-content-center', 'text-break']);
        questionNoDiv.innerHTML = "Question " + (i + 1) + "/" + output.length;
        outerDiv.appendChild(questionNoDiv);

        var questionDiv = document.createElement("div");
        questionDiv.classList.add(...['row', 'pastel-yellow', 'p-3', 'justify-content-center', 'text-break', 'my-0', 'h4']);
        questionDiv.innerHTML = output[i].question;
        outerDiv.appendChild(questionDiv);

        var options = [];
        options.push(output[i].optionOne);
        options.push(output[i].optionTwo);
        options.push(output[i].optionThree);
        options.push(output[i].optionFour);

        for (var j = 0; j < 4; j++) {
            var optionDiv = document.createElement("div");
            optionDiv.classList.add(...['row', 'bg-white', 'card']);


            var formParent = document.createElement("div");
            formParent.classList.add(...['card-body', 'd-inline']);

            var optionForm = document.createElement("div");
            optionForm.classList.add(...['form-check']);

            var input = document.createElement("input");
            input.classList.add(...['form-check-input']);
            input.type = "radio";
            input.id = "option" + (j + 1);
            input.name = "question" + (i + 1);

            var label = document.createElement("label");
            label.classList.add(...['form-check-label', 'card-title', 'h5']);
            label.innerHTML = options[j];
            label.for = input.id;

            optionForm.appendChild(input);
            optionForm.appendChild(label);

            formParent.appendChild(optionForm);
            optionDiv.appendChild(formParent);
            outerDiv.appendChild(optionDiv);
        }

        console.log(document.getElementsByName('question1'));
        console.log(document.getElementById('option1'));
        

        outerRow.appendChild(outerDiv);
    }

    // if (document.getElementById('option3').checked) {

    //     console.log("3 tipse");
    // }


    //to show in inspect console
    //console.log(out.data[0]["question"]);
}

window.onload = preload;

{/* <div class="col-6 m-3">
          <div class="row pastel-green p-2 justify-content-center text-break">
            Question 5/10
          </div>
          <div
            class="row p-3 pastel-yellow justify-content-center my-0 h4 text-break"
          >
            What is the capital city of Ukraine?
          </div>
          <div class="row bg-white">
            <div class="card">
              <div class="card-body d-inline">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label class="form-check-label h5 card-title" for="flexRadioDefault1">
                    Dhaka
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="row bg-white">
            <div class="card">
              <div class="card-body d-inline">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    checked
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    <h5 class="card-title">Kyiv</h5>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="row bg-white">
            <div class="card">
              <div class="card-body d-inline">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault3"
                  />
                  <label class="form-check-label" for="flexRadioDefault3">
                    <h5 class="card-title">Delhi</h5>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="row bg-white">
            <div class="card">
              <div class="card-body d-inline">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault4"
                  />
                  <label class="form-check-label" for="flexRadioDefault4">
                    <h5 class="card-title">Moscow</h5>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div> */}