import mongoose, { model } from "mongoose";
import { Appointment } from "../types/appointment.types";

const AppointmentSchema = new mongoose.Schema<Appointment>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true},
    endDate: { type: Date, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
});

const AppointmentModel = model<Appointment>("Appointment", AppointmentSchema);

export default AppointmentModel;