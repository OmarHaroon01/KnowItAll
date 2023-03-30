let parent = document.querySelector("#call")
let save = document.querySelector("#register")
console.log(save)

save.addEventListener("click", async () => {
    console.log("Hi")
    const res = await fetch("http://localhost:8080/register.php", {
        method: "POST",
        body: JSON.stringify({ "name": "Omar"}),
    });
    const output = await res.json();
    console.log(output)
});