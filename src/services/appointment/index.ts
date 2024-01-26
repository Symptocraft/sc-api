import { ObjectId } from "mongodb";
import AppointmentModel from "../../models/appointment.model";
import { Appointment } from "../../types/appointment.types";

const GetAppointments = async () => {
    try {
        const appointments: Appointment[] = await AppointmentModel.find();
        return appointments;
    } catch (error) {
        throw new Error('Bad Request');
    }
}

const GetAppointmentById = async (id: ObjectId) => {
    try {
        const appointment: Appointment | null = await AppointmentModel.findOne({ _id: id });
        return appointment;
    } catch (error: any) {
        throw new Error(error.message || 'Bad Request');
    }
}

const CreateAppointment = async (appointmentData: Appointment) => {
    const { name, description, startDate, endDate, userId } = appointmentData;
    try {
        // Check if all fields are provided
        if (!name || !description || !startDate || !endDate || !userId) {
            throw new Error('All fields are required');
        }

        const appointment = new AppointmentModel({
            name,
            description,
            startDate,
            endDate,
            userId,
        });

        // Save the appointment
        const newAppointment = await appointment.save();
        return newAppointment;
    } catch (error: any) {
        throw new Error(error.message || 'Bad Request');
    }
}

const UpdateAppointment = async (id: ObjectId, appointmentData: Appointment) => {
    //Update only the fields that are provided
    const { name, description, startDate, endDate, userId } = appointmentData;
    try {
        const appointment = await AppointmentModel.findOne({ _id: id });
        if (!appointment) {
            throw new Error('Appointment not found');
        }
        if (name) {
            appointment.name = name;
        }
        if (description) {
            appointment.description = description;
        }
        if (startDate) {
            appointment.startDate = startDate;
        }
        if (endDate) {
            appointment.endDate = endDate;
        }
        if (userId) {
            appointment.userId = userId;
        }
        // Save the appointment
        const updatedAppointment = await appointment.save();
        return updatedAppointment;
    } catch (error: any) {
        throw new Error(error.message || 'Bad Request');
    }
}

const DeleteAppointment = async (id: ObjectId) => {
    try {
        await AppointmentModel.deleteOne({ _id: id });
        return;
    } catch (error: any) {
        throw new Error(error.message || 'Bad Request');
    }
}

export {
    GetAppointments,
    GetAppointmentById,
    CreateAppointment,
    UpdateAppointment,
    DeleteAppointment,
}