

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const checkLoggedIn = async () => {
  let unid = getCookie("userId");
  const res = await fetch("http://localhost:8080/user/valid-user.php", {
    method: "POST",
    body: JSON.stringify({ unid: unid }),
  });
  const output = await res.json();
  console.log(output);
  let registerList = document.getElementById("registerList");
  let dashboardButton = document.getElementById("dashboardButton");
  if (output.data) {
    dashboardButton.classList.remove("d-none")
    registerList.classList.add("d-none");
  } else {
    dashboardButton.classList.add("d-none");
    registerList.classList.remove("d-none");
  }
};

window.onload = checkLoggedIn;