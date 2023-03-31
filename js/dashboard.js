

async function preLoad(){
    const res = await fetch("http://localhost:8080/user/dashboard.php", {
        method: "POST",
        body: JSON.stringify({ "unid": 1}),
    });
    const output = await res.json();
    console.log(output)
}