import { ObjectId } from "mongodb";
import SymptomModel from "../../models/symptom.model";
import { Symptom } from "../../types/symptom.types";

const GetSymptoms = async () => {
    try {
        const symptoms: Symptom[] = await SymptomModel.find();
        return symptoms;
    } catch (error) {
        throw new Error('Bad Request');
    }
}

const GetSymptomById = async (id: ObjectId) => {
    try {
        const symptom: Symptom | null = await SymptomModel.findOne({ _id: id });
        return symptom;
    } catch (error: any) {
        throw new Error(error.message || 'Bad Request');
    }
}

const CreateSymptom = async (symptomData: Symptom) => {
    const { name, description, slug } = symptomData;
    try {
        // Check if all fields are provided
        if (!name || !description || !slug) {
            throw new Error('All fields are required');
        }

        // Check if symptom already exists
        const oldSymptom = await SymptomModel.findOne({ slug: slug });
        if (oldSymptom) {
            throw new Error('Symptom already exists');
        }

        const symptom = new SymptomModel({
            name,
            description,
            slug,
        });
        // Save the symptom
        const newSymptom = await symptom.save();
        return newSymptom;
    } catch (error: any) {
        throw new Error(error.message || 'Bad Request');
    }
}

const UpdateSymptom = async (id: ObjectId, symptomData: Symptom) => {
    //Update only the fields that are provided
    const { name, description, slug } = symptomData;
    try {
        // Check if all fields are provided
        if (!name || !description || !slug) {
            throw new Error('All fields are required');
        }
        const symptom = await SymptomModel.findOne({ _id: id });
        if (!symptom) {
            throw new Error('Symptom not found');
        }
        if (name) {
            symptom.name = name;
        }
        if (description) {
            symptom.description = description;
        }
        if (slug) {
            symptom.slug = slug;
        }
        // Save the symptom
        const updatedSymptom = await symptom.save();
        return updatedSymptom;
    } catch (error: any) {
        throw new Error(error.message || 'Bad Request');
    }
}

const DeleteSymptom = async (id: ObjectId) => {
    try {
        await SymptomModel.deleteOne({ _id: id});
        return;
    } catch (error: any) {
        throw new Error(error.message || 'Bad Request');
    }
}

export { GetSymptoms, GetSymptomById, CreateSymptom, UpdateSymptom, DeleteSymptom };