
function init(){
    checkLocalStorage();
    renderLogin();
}


function checkLocalStorage(){
    let curr = localStorage.getItem("user");
    if(curr){
        window.location.href = "mainPage.html";
    }
}

function renderLogin() {
  console.log("renderLogin called");
  let container = document.getElementById('container');
  container.innerHTML = "";

  let loginBox = document.createElement("div");
  loginBox.id = "login-box";

  let title = document.createElement("h2");
  title.textContent = "Login";

  let form = document.createElement("form");
  form.id = "login-form";

  let userIdInput = document.createElement("input");
  userIdInput.type = "number";
  userIdInput.id = "userId";
  userIdInput.placeholder = "User ID";
  userIdInput.required = true;

  let submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Login";
  submitBtn.classList.add("disabled");
    submitBtn.addEventListener("click", (event) => {
      handleLogin(event);
    });

  let switchBtn = document.createElement("button");
  switchBtn.id = "goToRegister";
  switchBtn.type = "button";
  switchBtn.textContent = "Register";
  switchBtn.addEventListener("click", () => {
    renderRegister();
  });

  // בניית העץ
  form.appendChild(userIdInput);
  form.appendChild(submitBtn);

  loginBox.appendChild(title);
  loginBox.appendChild(form);
  loginBox.appendChild(switchBtn);

  container.appendChild(loginBox);

  // ☑️ הפעלת פונקציית בדיקת תקינות
  setupLoginValidation(userIdInput, submitBtn);
}

function setupLoginValidation(inputEl, buttonEl) {
  buttonEl.classList.add("disabled");

  inputEl.addEventListener("input", () => {
    let isValid = inputEl.value.trim() !== "";
    buttonEl.classList.toggle("disabled", !isValid);
  });
}

function renderRegister() {
  console.log("renderRegister called");
  let container = document.getElementById('container');
  container.innerHTML = "";

  let registerBox = document.createElement("div");
  registerBox.id = "register-box";

  let title = document.createElement("h2");
  title.textContent = "Register";

  let form = document.createElement("form");
  form.id = "register-form";

  let nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = "name";
  nameInput.placeholder = "Name";
  nameInput.required = true;

  let dobInput = document.createElement("input");
  dobInput.type = "date";
  dobInput.id = "dob";
  dobInput.required = true;

  let submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Register";
  submitBtn.classList.add("disabled");
    submitBtn.addEventListener("click", (event) => {
        handleRegister(event);
    });

  let backToLoginBtn = document.createElement("button");
  backToLoginBtn.id = "backToLogin";
  backToLoginBtn.type = "button";
  backToLoginBtn.textContent = "⬅ Back to Login";
    backToLoginBtn.addEventListener("click", () => {
        renderLogin();
    });

  // בניית הטופס
  form.appendChild(nameInput);
  form.appendChild(dobInput);
  form.appendChild(submitBtn);

  registerBox.appendChild(title);
  registerBox.appendChild(form);
  registerBox.appendChild(backToLoginBtn);

  container.appendChild(registerBox);

  // ☑️ בדיקת תקינות
  setupRegisterValidation(nameInput, dobInput, submitBtn);


}

function setupRegisterValidation(nameInput, dobInput, buttonEl) {
  buttonEl.classList.add("disabled");

  function checkValidity() {
    let isValid = nameInput.value.trim() !== "" && dobInput.value !== "";
    buttonEl.classList.toggle("disabled", !isValid);
  }

  nameInput.addEventListener("input", checkValidity);
  dobInput.addEventListener("input", checkValidity);
}

function handleLogin(event) {
  event.preventDefault();

  let userId = document.getElementById("userId").value;

  fetch(`http://localhost:5062/api/users/${userId}`)
    .then(res => {
      if (!res.ok) throw new Error("User not found");
      return res.json();
    })
    .then(user => {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "homePage.html";
    })
    .catch(() => {
      alert("⚠️ המשתמש לא נמצא במערכת");
    });
}


function handleRegister(event) {
  event.preventDefault();

  let name = document.getElementById("name").value.trim();
  let dob = document.getElementById("dob").value;

  fetch("http://localhost:5062/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name, dateOfBirth: dob })
  })
    .then(res => {
      if (!res.ok) throw new Error("Registration failed");
      return res.json();
    })
    .then(user => {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "homePage.html";
    })
    .catch(() => {
      alert("⚠️ שם כבר קיים או שגיאה ברישום");
    });
}














init();