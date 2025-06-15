function init() {
  checkLogin();
  renderCreateEventButton();
  renderSearchForm();
  renderSearchByIdForm(); // החיפוש לפי ID

}

function checkLogin() {
  let user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "login.html";
  }
}


function renderCreateEventButton() {
  const container = document.getElementById("create-event-container") || document.body;
  const btn = document.createElement("button");
  btn.textContent = "➕ יצירת אירוע חדש";
  btn.classList.add("create-event-btn");

  btn.addEventListener("click", () => {
    renderCreateEventForm();
  });

  container.appendChild(btn);
}

function renderCreateEventForm() {
  const container = document.getElementById("container");
  container.innerHTML = "";

  const form = document.createElement("form");
  form.classList.add("event-form");

  const title = document.createElement("h3");
  title.textContent = "📝 יצירת אירוע חדש";

  // 🔹 Name
  const nameLabel = document.createElement("label");
  nameLabel.textContent = "שם האירוע:";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.required = true;

  // 🔹 Location
  const locationLabel = document.createElement("label");
  locationLabel.textContent = "מיקום:";
  const locationInput = document.createElement("input");
  locationInput.type = "text";
  locationInput.required = true;

  // 🔹 StartDate
  const startLabel = document.createElement("label");
  startLabel.textContent = "תאריך התחלה:";
  const startInput = document.createElement("input");
  startInput.type = "datetime-local";
  startInput.required = true;

  // 🔹 EndDate
  const endLabel = document.createElement("label");
  endLabel.textContent = "תאריך סיום:";
  const endInput = document.createElement("input");
  endInput.type = "datetime-local";
  endInput.required = true;

  // 🔹 MaxRegistrations
  const maxLabel = document.createElement("label");
  maxLabel.textContent = "מספר משתתפים מקסימלי:";
  const maxInput = document.createElement("input");
  maxInput.type = "number";
  maxInput.min = "1";
  maxInput.required = true;

  // 🔹 Submit
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "📤 צור אירוע";

  // 🔹 Cancel
  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.textContent = "❌ ביטול";
  cancelBtn.addEventListener("click", () => {
    renderSearchForm();
  });

  form.append(
    title,
    nameLabel, nameInput,
    locationLabel, locationInput,
    startLabel, startInput,
    endLabel, endInput,
    maxLabel, maxInput,
    submitBtn,
    cancelBtn
  );

  container.appendChild(form);

  // שליחה
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const eventObj = {
      name: nameInput.value.trim(),
      location: locationInput.value.trim(),
      startDate: startInput.value,
      endDate: endInput.value,
      maxRegistrations: parseInt(maxInput.value)
    };

    createNewEvent(eventObj);
  });
}


function createNewEvent(eventObj) {
  fetch("http://localhost:5062/api/Events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventObj)
  })
    .then(res => {
      if (!res.ok) throw new Error("שגיאה ביצירת האירוע");
      return res.text();
    })
    .then(msg => {
      alert("✅ אירוע נוצר בהצלחה");
      renderSearchForm(); // מחזיר את טופס החיפוש
    })
    .catch(err => {
      console.error("❌ שגיאה:", err);
      alert("⚠️ לא הצלחנו ליצור את האירוע");
    });
}


function renderSearchForm() {
  let container = document.getElementById("container");
  container.innerHTML = "";

  let formBox = document.createElement("div");
  formBox.id = "search-box";

  let title = document.createElement("h2");
  title.textContent = "חיפוש אירועים לפי תאריך";

  let form = document.createElement("form");
  form.id = "search-form";

  let startInput = document.createElement("input");
  startInput.type = "date";
  startInput.id = "startDate";
  startInput.required = true;

  let endInput = document.createElement("input");
  endInput.type = "date";
  endInput.id = "endDate";
  endInput.required = true;

  let submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "חיפוש";
  submitBtn.classList.add("disabled");

  // עץ
  form.appendChild(startInput);
  form.appendChild(endInput);
  form.appendChild(submitBtn);

  formBox.appendChild(title);
  formBox.appendChild(form);

  container.appendChild(formBox);

  // ☑️ ולידציה
  setupDateValidation(startInput, endInput, submitBtn);

  // 🟢 שליחה
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let start = startInput.value;
    let end = endInput.value;
    loadEventsByDate(start, end);
  });
}

function setupDateValidation(startInput, endInput, buttonEl) {
  buttonEl.classList.add("disabled");

  function checkValid() {
    let valid = startInput.value !== "" && endInput.value !== "";
    buttonEl.classList.toggle("disabled", !valid);
  }

  startInput.addEventListener("input", checkValid);
  endInput.addEventListener("input", checkValid);
}

function loadEventsByDate(start, end) {
let url = `http://localhost:5062/api/Events/schedule?start=${start}T00:00:00&end=${end}T23:59:59`;


  fetch(url)
    .then(res => res.json())
    .then(events => {
      renderEvents(events);
    })
    .catch((err) => {
      let container = document.getElementById("container");
      console.error("Error loading events:", err);
      container.innerHTML += "<p>❌ שגיאה בטעינת האירועים</p>";
    });
}

function renderEvents(events) {
  let container = document.getElementById("container");

  let oldResults = document.getElementById("results");
  if (oldResults) oldResults.remove();

  let resultsBox = document.createElement("div");
  resultsBox.id = "results";
  resultsBox.classList.add("events-grid");

  events.forEach(event => {
    let card = document.createElement("div");
    card.classList.add("event-card");

    let title = document.createElement("h3");
    title.textContent = event.name;

    let location = document.createElement("p");
    location.innerHTML = `<strong>📍 מיקום:</strong> ${event.location}`;

    let date = document.createElement("p");
    date.innerHTML = `<strong>🗓 תאריך:</strong> ${event.startDate.split("T")[0]}`;

    // 🌤️ אלמנט להצגת מזג האוויר
    let weather = document.createElement("p");
    weather.style.display = "none";

    let weatherBtn = document.createElement("button");
    weatherBtn.classList.add("weather-btn");
    weatherBtn.textContent = "בדוק מזג אוויר";
    weatherBtn.addEventListener("click", () => {
      weather.style.display = "block";
      loadWeatherForEvent(event.id, weather);
      weatherBtn.remove();
    });

    let registerBtn = document.createElement("button");
    registerBtn.classList.add("register-btn");
    registerBtn.textContent = "להרשמה";
    registerBtn.addEventListener("click", () => {
      registerToEvent(event.id);
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "מחק אירוע";
    deleteBtn.addEventListener("click", () => {
      deleteEvent(event.id);
    });

    let editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.textContent = "✏️ ערוך";
    editBtn.addEventListener("click", () => {
      renderEditForm(event);
    });

    // 🧍 כפתור וטוגל של משתתפים
    let participantsBox = document.createElement("div");
    participantsBox.classList.add("participants-box");
    participantsBox.style.display = "none";

    let participantsBtn = document.createElement("button");
    participantsBtn.classList.add("participants-btn");
    participantsBtn.textContent = "👥 הצג רשומים";

    participantsBtn.addEventListener("click", () => {
      if (participantsBox.style.display === "none") {
        participantsBox.innerHTML = "🔄 טוען...";
        participantsBox.style.display = "block";
        participantsBtn.textContent = "🚫 הסתר רשומים";
        loadParticipants(event.id, participantsBox);
      } else {
        participantsBox.style.display = "none";
        participantsBox.innerHTML = "";
        participantsBtn.textContent = "👥 הצג רשומים";
      }
    });

    // 🧱 הרכבת הקובייה
    card.appendChild(title);
    card.appendChild(location);
    card.appendChild(date);
    card.appendChild(weatherBtn);
    card.appendChild(weather);
    card.appendChild(registerBtn);
    card.appendChild(deleteBtn);
    card.appendChild(editBtn);
    card.appendChild(participantsBtn);
    card.appendChild(participantsBox);

    resultsBox.appendChild(card);
  });

  container.appendChild(resultsBox);
}

function registerToEvent(eventId) {
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("⚠️ עליך להיות מחובר כדי להירשם");
    return;
  }

  fetch(`http://localhost:5062/api/Events/${eventId}/registration`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  })
    .then(res => {
      if (!res.ok) throw new Error("שגיאה בהרשמה");
      return res.text();
    })
    .then(msg => {
      alert("✅ נרשמת בהצלחה לאירוע!");
        console.log("✅ הצלחה:", msg);
    })
    .catch(err => {
      console.error("❌ שגיאה:", err);
      alert("❌ לא הצלחנו לרשום אותך לאירוע");
    });
}

function renderSearchByIdForm() {
  let container = document.getElementById("search-by-id");
  container.innerHTML = "";

  let input = document.createElement("input");
  input.type = "number";
  input.id = "eventIdInput";
  input.placeholder = "הכנס ID של אירוע";

  let btn = document.createElement("button");
  btn.textContent = "חפש לפי ID";
  btn.disabled = true;

  input.addEventListener("input", () => {
    btn.disabled = input.value.trim() === "";
  });

  btn.addEventListener("click", () => {
    let eventId = input.value.trim();
    if (eventId) {
      loadEventById(eventId);
    }
  });

  container.appendChild(input);
  container.appendChild(btn);
}

function loadEventById(eventId) {
  fetch(`http://localhost:5062/api/Events/${eventId}`)
    .then(res => {
      if (!res.ok) throw new Error("אירוע לא נמצא");
      return res.json();
    })
    .then(event => {
      renderEvents([event]); // שמים אותו במערך כדי שהפונקציה תדע לטפל בו
    })
    .catch(err => {
      console.error("שגיאה:", err);
      alert(`❌ אירוע עם ID ${eventId} לא נמצא`);
      let container = document.getElementById("events-container");
      container.innerHTML = `<p>❌ אירוע עם ID ${eventId} לא נמצא</p>`;
    });
}

function deleteEvent(eventId) {
  fetch(`http://localhost:5062/api/Events/${eventId}`, {
    method: "DELETE"
  })
    .then(res => {
      if (!res.ok) throw new Error("שגיאה במחיקת האירוע");
      alert("✅ האירוע נמחק בהצלחה");

      // 1️⃣ ניקוי אזור התוצאות
      const results = document.getElementById("results");
      if (results) results.remove();

      // 2️⃣ שליחת טופס החיפוש מחדש (על סמך התאריכים שכבר נבחרו)
      const form = document.getElementById("search-form");
      if (form) {
        form.requestSubmit(); // כמו לחיצה על כפתור "חיפוש"
      }
    })
    .catch(err => {
      console.error("❌ שגיאה:", err);
      alert("❌ לא הצלחנו למחוק את האירוע");
    });
}

function loadWeatherForEvent(eventId, weatherElement) {
  fetch(`http://localhost:5062/api/Events/${eventId}/weather`)
    .then(res => {
      if (!res.ok) throw new Error("שגיאה במזג אוויר");
      return res.text();
    })
    .then(weatherStr => {
      weatherElement.textContent = `🌤️ מזג אוויר: ${weatherStr}`;
    })
    .catch(() => {
      weatherElement.textContent = "⚠️ מזג אוויר לא זמין";
    });
}

function renderEditForm(event) {
  let container = document.getElementById("container");
  container.innerHTML = "";

  let formBox = document.createElement("div");
  formBox.classList.add("edit-box");

  let title = document.createElement("h2");
  title.textContent = `עריכת אירוע #${event.id}`;

  // === שם האירוע ===
  let nameLabel = document.createElement("label");
  nameLabel.textContent = "שם האירוע:";
  nameLabel.setAttribute("for", "edit-name");

  let nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = "edit-name";
  nameInput.value = event.name;

  // === מיקום ===
  let locationLabel = document.createElement("label");
  locationLabel.textContent = "מיקום:";
  locationLabel.setAttribute("for", "edit-location");

  let locationInput = document.createElement("input");
  locationInput.type = "text";
  locationInput.id = "edit-location";
  locationInput.value = event.location;

  // === תאריך התחלה ===
  let startLabel = document.createElement("label");
  startLabel.textContent = "תאריך התחלה:";
  startLabel.setAttribute("for", "edit-start");

  let startInput = document.createElement("input");
  startInput.type = "date";
  startInput.id = "edit-start";
  startInput.value = event.startDate.split("T")[0];

  // === תאריך סיום ===
  let endLabel = document.createElement("label");
  endLabel.textContent = "תאריך סיום:";
  endLabel.setAttribute("for", "edit-end");

  let endInput = document.createElement("input");
  endInput.type = "date";
  endInput.id = "edit-end";
  endInput.value = event.endDate?.split("T")[0] || "";

  // === הרשמות מקסימליות ===
  let maxLabel = document.createElement("label");
  maxLabel.textContent = "מספר הרשמות מקסימלי:";
  maxLabel.setAttribute("for", "edit-max");

  let maxInput = document.createElement("input");
  maxInput.type = "number";
  maxInput.id = "edit-max";
  maxInput.min = 0;
  maxInput.value = event.maxRegistrations;

  // === כפתורי שמירה וביטול ===
  let saveBtn = document.createElement("button");
  saveBtn.textContent = "💾 שמור שינויים";
  saveBtn.addEventListener("click", () => {
    if (!nameInput.value || !startInput.value) {
      alert("🛑 נא למלא לפחות שם ותאריך התחלה");
      return;
    }

    updateEvent(event.id, {
      name: nameInput.value,
      location: locationInput.value,
      startDate: startInput.value,
      endDate: endInput.value || null,
      maxRegistrations: parseInt(maxInput.value) || 0
    });
  });

  let cancelBtn = document.createElement("button");
  cancelBtn.textContent = "❌ ביטול";
  cancelBtn.addEventListener("click", () => {
    renderSearchForm();
  });

  // === הרכבת הטופס ===
  formBox.appendChild(title);

  formBox.appendChild(nameLabel);
  formBox.appendChild(nameInput);

  formBox.appendChild(locationLabel);
  formBox.appendChild(locationInput);

  formBox.appendChild(startLabel);
  formBox.appendChild(startInput);

  formBox.appendChild(endLabel);
  formBox.appendChild(endInput);

  formBox.appendChild(maxLabel);
  formBox.appendChild(maxInput);

  formBox.appendChild(saveBtn);
  formBox.appendChild(cancelBtn);

  container.appendChild(formBox);
}

function updateEvent(id, data) {
  fetch(`http://localhost:5062/api/Events/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => {
      if (!res.ok) throw new Error("שגיאה בעדכון האירוע");
      alert("✅ האירוע עודכן בהצלחה");
        renderSearchForm();    })
    .catch(err => {
      console.error("❌", err);
      alert("❌ שגיאה בשמירת השינויים");
    });
}

function loadParticipants(eventId, containerElement) {
  fetch(`http://localhost:5062/api/Events/${eventId}/registration`)
    .then(res => {
      if (!res.ok) throw new Error("שגיאה בשליפת רשומים");
      return res.json();
    })
    .then(users => {
      containerElement.innerHTML = ""; // ניקוי קודם

      if (users.length === 0) {
        let emptyMsg = document.createElement("p");
        emptyMsg.textContent = "אין רשומים לאירוע זה";
        containerElement.appendChild(emptyMsg);
        return;
      }

      const list = document.createElement("ul");
      list.classList.add("participant-list");

      users.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `${user.name} (${new Date(user.dateOfBirth).toLocaleDateString('he-IL')})`;
        list.appendChild(li);
      });

      containerElement.appendChild(list);
    })
    .catch(err => {
      console.error("❌ שגיאה בטעינת רשומים:", err);
      alert("⚠️ לא ניתן לטעון את הרשומים לאירוע זה.");
    });
}







































init();
