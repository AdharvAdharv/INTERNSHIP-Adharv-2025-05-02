import express from "express";
import { Student } from "../Models/Student.js";
import { Class } from "../Models/Class.js";

const studentRoutes = express.Router();

// Adding a new Student
studentRoutes.post("/add", async (req, res) => {
  try {
    const { name, mobileNo, standard, division } = req.body;

    if (!name || !mobileNo || !standard || !division) {
      return res.status(400).json({ message: "All fields are required" });
    }
    

    const foundClass = await Class.findOne({ standard, division });
    if (!foundClass) {
      return res.status(404).json({ message: "Class not found. Cannot assign student." });
    }
      
      const studentCountInClass = await Student.countDocuments({ classId: foundClass._id });

      // Auto-generate roll num
      const newRollNo = studentCountInClass + 1;

      const studentCount = await Student.countDocuments();
const newRegNo = "REG" + String(studentCount + 1).padStart(3, "0");

    
    const newStudent = new Student({
      regNo: newRegNo,
      name,
      rollNo:newRollNo,
      mobileNo,
      classId: foundClass._id
    });

    await newStudent.save();

    res.status(201).json({ message: "Student created successfully", student: newStudent });

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


// Finding all students in a Standard
studentRoutes.get("/getAllStudents",async (req,res)=>{
  try{
    const { standard } =req.body;

       
       const classesInStandard = await Class.find({ standard });

       if (classesInStandard.length === 0) {
         return res.status(404).json({ message: "No classes found for this standard" });
       }
   
       const classIds = classesInStandard.map(c => c._id);
   
       const students = await Student.find({ classId: { $in: classIds } }).populate("classId");
   
       res.status(200).json({ totalStudents: students.length, students });


  }catch(error){
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
})


// Finding all students in a Divinsion
studentRoutes.get("/getClassStudents", async (req, res) => {
  try {
    const { standard, division } = req.body;

   // Look for the class by standard and division
    const foundClass = await Class.findOne({ standard, division });

    if (!foundClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    const students = await Student.find({ classId: foundClass._id }).populate("classId");

    if (students.length === 0) {
      return res.status(404).json({ message: "No students found in this class" });
    }

    res.status(200).json({ totalStudents: students.length, students });

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Updating Standard and Division of a student with Reg No
studentRoutes.put("/updateClass/:regNo", async (req, res) => {
  try {
    const { regNo } = req.params;
    const { standard, division } = req.body;

    // Checking  standard and division
    const newClass = await Class.findOne({ standard, division });

    if (!newClass) {
      return res.status(404).json({ message: "Target class not found" });
    }

    
    const updatedStudent = await Student.findOneAndUpdate(
      { regNo: regNo }, 
      { classId: newClass._id }, 
      { new: true }
        
    ).populate("classId");

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student's class updated successfully", student: updatedStudent });

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Remove a student using Reg no
studentRoutes.delete("/delete/:regNo", async (req, res) => {
  try {
    const { regNo } = req.params;

    // Find and delete student
    const deletedStudent = await Student.findOneAndDelete(regNo);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully", student: deletedStudent });

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});



export default studentRoutes;
