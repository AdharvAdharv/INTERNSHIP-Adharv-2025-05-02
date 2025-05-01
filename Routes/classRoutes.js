import express from "express";
import { Class } from "../Models/Class.js";

const classRoutes = express.Router();

// Creating a new class 
classRoutes.post("/add", async (req, res) => {
  try {
    const { standard, division } = req.body;

    // Check if the class already exists
    const existingClass = await Class.findOne({ standard, division });
    if (existingClass) {
      return res.status(400).json({ message: "Class already exists" });
    }

   
    const newClass = new Class({ standard, division });
    await newClass.save();

    res.status(201).json({ message: "Class created", class: newClass });

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//  For deleting Class
classRoutes.delete("/delete",async (req,res) =>{
    try{
        const {standard, division} =req.body;
        const existingClass = await Class.findOneAndDelete({standard , division});
        if(!existingClass){
            return res.status(400).json({message: "Class not found"});
        }
        
        res.status(200).json({ message: "Class deleted successfully", deletedClass: existingClass });



    }catch(error){
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

export default classRoutes;
