let parent = document.querySelector("#call")
let save = document.querySelector("#register")
console.log(save)

save.addEventListener("click", async () => {
    console.log("Hi")
    // var valid = String(email.value)
    // .toLowerCase()
    // .match(
    //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // );

    const res = await fetch("http://localhost:8080/register.php", {
        method: "POST",
        body: JSON.stringify({ "name": "Omar"}),
    });
    const output = await res.json();
    console.log(output)
});