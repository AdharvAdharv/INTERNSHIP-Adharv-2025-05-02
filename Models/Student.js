import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  regNo: { type: String, unique: true },
  name: { type: String, required: true },
  rollNo: { type: Number, required: true, unique: true },
  mobileNo: { type: String, required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" }
}, { timestamps: true });

export const Student = mongoose.model("Student", studentSchema);
