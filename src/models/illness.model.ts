import mongoose, { model } from "mongoose";
import { Illness } from "../types/illness.types";

const IllnessSchema = new mongoose.Schema<Illness>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
});

const IllnessModel = model<Illness>("Illness", IllnessSchema);

export default IllnessModel;