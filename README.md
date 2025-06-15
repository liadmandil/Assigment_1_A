# 🎉 Event Management System – Part A

🔗 **GitHub:** [https://github.com/liadmandil/Assigment_1_A](https://github.com/liadmandil/Assigment_1_A)  
📬 **Postman Collection:** `Event User.postman_collection.json` (נמצא בריפוזיטורי)  
🗃️ **Database:** `Events`  
🧪 **התחברות לבדיקה מהירה:** התחבר עם מזהה משתמש `ID = 5`

---

## 🖥️ Frontend

הפרונט נכתב ב־HTML + JavaScript (Vanilla JS). הכל מבוסס על דינמיקה ב־JS, ללא ספריות צד שלישי.

📂 **מיקום:** `client/wwwroot/`

### ✨ עמודים:
- `login.html` – עמוד התחברות והרשמה  
- `homePage.html` – דף הבית להצגת כל האירועים, הרשמה, עריכה, מחיקה, חיפוש לפי תאריך או מזהה, צפייה במשתתפים ומזג אוויר

---

## 🧩 API Structure

### 🔹 EventController (`/api/Event`)

| פעולה                     | HTTP   | מסלול                                                              | תיאור                                 |
|---------------------------|--------|--------------------------------------------------------------------|---------------------------------------|
| קבלת אירוע לפי ID        | `GET`  | `/api/Event/{EventId}`                                            | מחזיר אירוע לפי מזהה                 |
| יצירת אירוע חדש          | `POST` | `/api/Event`                                                      | יצירת אירוע חדש                      |
| עדכון אירוע קיים         | `PUT`  | `/api/Event`                                                      | עדכון פרטי אירוע                     |
| מחיקת אירוע              | `DELETE`| `/api/Event/{EventId}`                                           | מחיקה לפי מזהה                       |
| שליפת אירועים לפי תאריכים| `GET`  | `/api/Event/schedule?start={start}&end={end}`                     | מחזיר את כל האירועים בטווח תאריכים   |
| הרשמת משתמש לאירוע       | `POST` | `/api/Event/{EventId}/registration`                               | רישום משתמש לאירוע                   |
| צפייה במשתתפים לאירוע    | `GET`  | `/api/Event/{EventId}/registration`                               | החזרת כל המשתתפים באירוע             |
| מזג אוויר לאירוע         | `GET`  | `/api/Event/{EventId}/weather`                                    | מחזיר מחרוזת עם מידע על מזג האוויר   |

---

### 🔹 UsersController (`/api/Users`)

| פעולה              | HTTP   | מסלול                    | תיאור                         |
|--------------------|--------|---------------------------|-------------------------------|
| קבלת משתמש לפי ID | `GET`  | `/api/Users/{UserId}`     | מחזיר פרטי משתמש לפי מזהה    |
| יצירת משתמש חדש   | `POST` | `/api/Users/register`     | הרשמה של משתמש חדש למערכת    |

---

## 🚀 איך מריצים מקומית

1. ודא שה־SQL Server כולל את מסד הנתונים `Events`
2. הרץ את קובץ `DATA.sql` להזרקת טבלאות ונתוני בדיקה
3. פתח את הקובץ `DATA.sln` ב־Visual Studio
4. הגדר את הפרויקט `API` כ־Startup Project
5. הרץ את המערכת והיכנס לכתובת:  
   `https://localhost:{port}/html/login.html`

---

