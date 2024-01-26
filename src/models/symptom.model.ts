import mongoose, { model } from "mongoose";
import { Symptom } from "../types/symptom.types";

const SymptomSchema = new mongoose.Schema<Symptom>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
});

const SymptomModel = model<Symptom>("Symptom", SymptomSchema);

export default SymptomModel;