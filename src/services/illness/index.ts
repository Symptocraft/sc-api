import { ObjectId } from "mongodb";
import IllnessModel from "../../models/illness.model";
import { Illness } from "../../types/illness.types";

const GetIllnesses = async () => {
    try {
        const illnesses: Illness[] = await IllnessModel.find();
        return illnesses;
    } catch (error) {
        throw new Error('Bad Request');
    }
}

const GetIllnessById = async (id: ObjectId) => {
    try {
        const illness: Illness | null = await IllnessModel.findOne({ _id: id });
        return illness;
    } catch (error: any) {
        throw new Error(error.message || 'Bad Request');
    }
}

const CreateIllness = async (illnessData: Illness) => {
    const { name, description, slug } = illnessData;
    try {
        // Check if all fields are provided
        if (!name || !description || !slug) {
            throw new Error('All fields are required');
        }

        // Check if illness already exists
        const oldIllness = await IllnessModel.findOne({ slug: slug });
        if (oldIllness) {
            throw new Error('Illness already exists');
        }

        const illness = new IllnessModel({
            name,
            description,
            slug,
        });
        // Save the illness
        const newIllness = await illness.save();
        return newIllness;
    } catch (error: any) {
        throw new Error(error.message || 'Bad Request');
    }
}

const UpdateIllness = async (id: ObjectId, illnessData: Illness) => {
    //Update only the fields that are provided
    const { name, description, slug } = illnessData;
    try {
        // Check if all fields are provided
        if (!name || !description || !slug) {
            throw new Error('All fields are required');
        }
        const illness = await IllnessModel.findOne({ _id: id });
        if (!illness) {
            throw new Error('Illness not found');
        }
        if (name) {
            illness.name = name;
        }
        if (description) {
            illness.description = description;
        }
        if (slug) {
            illness.slug = slug;
        }
        const updatedIllness = await illness.save();
        return updatedIllness;
    } catch (error: any) {
        throw new Error(error.message || 'Bad Request');
    }
}

const DeleteIllness = async (id: ObjectId) => {
    try {
        await IllnessModel.deleteOne({ _id: id });
        return;
    } catch (error: any) {
        throw new Error(error.message || 'Bad Request');
    }
}

export {
    GetIllnesses,
    GetIllnessById,
    CreateIllness,
    UpdateIllness,
    DeleteIllness,
}
