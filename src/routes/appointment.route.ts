import { Router } from "express";
import { CreateAppointment, DeleteAppointment, GetAppointmentById, GetAppointments, UpdateAppointment } from "../services/appointment";
import { Appointment } from "../types/appointment.types";
import { ObjectId } from "mongodb";

const AppointmentRoutes = Router();

AppointmentRoutes.get("/", async (req, res) => {
    try {
        const appointments:Appointment[] = await GetAppointments();
        res.status(200).json(appointments);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

AppointmentRoutes.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const appointment: Appointment | null = await GetAppointmentById(new ObjectId(id));
        res.status(200).json(appointment);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

AppointmentRoutes.post("/", async (req, res) => {
    try {
        const newAppointment:Appointment = await CreateAppointment(req.body);
        res.status(201).json(newAppointment);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

AppointmentRoutes.put("/:id", async (req, res) => {
    const { id } = req.params;
    const appointmentData:Appointment = req.body;
    try {
        await UpdateAppointment(new ObjectId(id), appointmentData);
        res.status(200).json({ message: "Appointment updated successfully" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

AppointmentRoutes.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await DeleteAppointment(new ObjectId(id));
        res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

export default AppointmentRoutes;