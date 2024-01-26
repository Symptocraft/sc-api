import { ObjectId } from "mongodb";
import OccurenceModel from "../../models/occurence.model";
import { SymptomOccurence } from "../../types/occurence.types";

const GetOccurences = async () => {
    try {
        const occurences: SymptomOccurence[] = await OccurenceModel.find();
        return occurences;
    } catch (error) {
        throw new Error('Bad Request');
    }
}

const GetOccurenceById = async (id: ObjectId) => {
    try {
        const occurence: SymptomOccurence | null = await OccurenceModel.findOne({ _id: id });
        return occurence;
    } catch (error: any) {
        throw new Error(error.message || 'Bad Request');
    }
}

const CreateOccurence = async (occurenceData: SymptomOccurence) => {
    const { symptomId, illnessId, userId, occurenceStartDate, occurenceEndDate } = occurenceData;
    try {
        // Check if all fields are provided
        if (!symptomId || !illnessId || !userId || !occurenceStartDate || !occurenceEndDate) {
            throw new Error('All fields are required');
        }

        const occurence = new OccurenceModel({
            symptomId,
            illnessId,
            userId,
            occurenceStartDate,
            occurenceEndDate,
        });

        // Save the occurence
        const newOccurence = await occurence.save();
        return newOccurence;
    } catch (error: any) {
        throw new Error(error.message || 'Bad Request');
    }
}

const UpdateOccurence = async (id: ObjectId, occurenceData: SymptomOccurence) => {
    //Update only the fields that are provided
    const { symptomId, illnessId, userId, occurenceStartDate, occurenceEndDate } = occurenceData;
    try {
        const occurence = await OccurenceModel.findOne({ _id: id });
        if (!occurence) {
            throw new Error('Occurence not found');
        }
        if (symptomId) {
            occurence.symptomId = symptomId;
        }
        if (illnessId) {
            occurence.illnessId = illnessId;
        }
        if (userId) {
            occurence.userId = userId;
        }
        if (occurenceStartDate) {
            occurence.occurenceStartDate = occurenceStartDate;
        }
        if (occurenceEndDate) {
            occurence.occurenceEndDate = occurenceEndDate;
        }
        // Save the occurence
        const updatedOccurence = await occurence.save();
        return updatedOccurence;
    } catch (error: any) {
        throw new Error(error.message || 'Bad Request');
    }
}

const DeleteOccurence = async (id: ObjectId) => {
    try {
        await OccurenceModel.deleteOne({ _id: id });
        return;
    } catch (error: any) {
        throw new Error(error.message || 'Bad Request');
    }
}

export {
    GetOccurences,
    GetOccurenceById,
    CreateOccurence,
    UpdateOccurence,
    DeleteOccurence
}