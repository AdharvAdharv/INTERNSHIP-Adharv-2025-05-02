# 📚 Student Manager API

A RESTful API for managing students and classes, including automatic roll number generation, student registration numbers, class assignments, and class-based student queries.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv
- CORS
- Nodemon (for development)

---

## 📖 Features

✅ Create Class  
✅ Delete Class  
✅ Create Student (with automatic roll number & unique registration number)  
✅ Update Student’s Class (by standard & division)  
✅ Delete Student  
✅ Read All Students in a Standard  
✅ Read All Students in a Class (by standard + division)  
✅ MongoDB relationships via ObjectId references  
✅ Auto-generated unique **regNo** for each student (e.g. REG001, REG002...)  
✅ Auto-generated sequential **rollNo** within each class  
✅ Error handling with proper HTTP status codes  
✅ Clean modular routes

---

## 📦 API Routes

### 🏫 Class Routes  
- `POST /api/classes` → Create Class  
- `DELETE /api/classes/delete` → Delete Class  

### 👩‍🎓 Student Routes  
- `POST /api/students` → Create Student (auto rollNo & regNo)  
- `GET /api/students/getAllStudents` → Read All Students in a Standard  
- `GET /api/students/getClassStudents` → Read All Students in a Class (by standard & division)  
- `PUT /api/students/updateClass/:regNo` → Update Student’s Class by `regNo`  
- `DELETE /api/students/delete/:studentId` → Delete Student  

---

## 📦 .env Example

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/StudentDB
```
## 📦 Run Instructions


`npm install`
`npm run dev`
Server runs at: http://localhost:5000


## 📖 Auto-generated Fields
 ✅ rollNo: sequential roll number auto-assigned based on number of students in the class

 ✅ regNo: globally unique registration number assigned to every student (e.g. REG001, REG002...)
