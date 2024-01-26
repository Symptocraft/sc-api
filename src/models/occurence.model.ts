import mongoose, { model } from "mongoose";
import { SymptomOccurence } from "../types/occurence.types";

const OccurenceSchema = new mongoose.Schema<SymptomOccurence>({
    symptomId: { type: mongoose.Schema.Types.ObjectId, ref: "Symptom" },
    illnessId: { type: mongoose.Schema.Types.ObjectId, ref: "Illness" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    occurenceStartDate: { type: Date },
    occurenceEndDate: { type: Date },
});

const OccurenceModel = model<SymptomOccurence>("Occurence", OccurenceSchema);

export default OccurenceModel;