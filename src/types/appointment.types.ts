import { ObjectId } from "mongodb";

type Appointment = {
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    userId: ObjectId,
};

export { Appointment };