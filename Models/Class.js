import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  standard: { type: String, required: true },
  division: { type: String, required: true }
}, { timestamps: true });

export const Class = mongoose.model("Class", classSchema);
