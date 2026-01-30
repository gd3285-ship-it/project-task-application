# מערכת לניהול משימות בצוותים (Task Manager)

מערכת לניהול משימות בצוותים, בדומה ל-ClickUp, הבנויה ב-**Angular**.
המערכת מאפשרת עבודה בצוותים, ניהול פרויקטים, וניהול משימות עם לוח קנבן מתקדם.

---

## 🎯 תכונות עיקריות

### ✨ ניהול משתמשים
* 🔐 **התחברות והרשמה** (Auth) עם JWT Token
* 👤 **ניהול פרופיל משתמש**
* 🔒 **אבטחת נתונים** מלאה

### 👥 ניהול צוותים
* ➕ **יצירת צוותים חדשים**
* 👨‍💼 **הוספת חברים לצוות** (לפי מזהה משתמש)
* 📊 **צפייה בנתוני צוות**
* 🔍 **רשימת צוותים** אישית לכל משתמש

### 📁 ניהול פרויקטים
* 🆕 **יצירת פרויקטים** בתוך צוותים
* 📝 **תיאור וניהול** לכל פרויקט
* 🗂️ **ארגון היררכי** מסודר

### ✅ לוח משימות (Kanban Board)
* 📋 **3 עמודות סטטוס:** לביצוע (Todo), בתהליך (In Progress), הושלם (Done)
* ➕ **הוספת משימות** עם כותרת, תיאור ותאריך יעד
* 🎨 **עדיפויות צבעוניות:** נמוכה, רגילה, גבוהה
* 🔄 **גרירת משימות** (Drag & Drop) בין עמודות
* 🗑️ **מחיקת משימות** וניהול שוטף

---

## 🚀 התחלת עבודה (Installation)

### דרישות מוקדמות
* **Node.js** (גרסה 18 ומעלה)
* **Angular CLI**

```bash
npm install -g @angular/cli
📥 הורדה והתקנה
שכפול הפרויקט (Clone):
git clone [https://github.com/your-username/team-tasks-angular.git](https://github.com/your-username/team-tasks-angular.git)
cd team-tasks-angular
התקנת תלויות (Install):
npm install
הפעלת האפליקציה:
ng serve --open
האפליקציה תפעל בכתובת: http://localhost:4200

🌐 השרת (Backend)
הפרויקט מתקשר עם שרת Node.js חיצוני. יש להוריד ולהפעיל את השרת כדי שהמערכת תעבוד:
git clone [https://github.com/rivkamos/WolfTasksServer.git](https://github.com/rivkamos/WolfTasksServer.git)
cd WolfTasksServer
npm install
npm start
השרת יפעל בכתובת: http://localhost:3000

🎨 טכנולוגיות
Frontend: Angular 17+, TypeScript, SCSS

State Management: Angular Signals

Routing: Angular Router

HTTP: HttpClient & Interceptors
📧 יצירת קשר
נוצר על ידי גיטי דויטש 
