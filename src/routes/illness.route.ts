import { Router } from 'express';
import { ObjectId } from "mongodb";
import { CreateIllness, DeleteIllness, GetIllnessById, GetIllnesses, UpdateIllness } from '../services/illness';
import { Illness } from '../types/illness.types';

const IllnessRoutes = Router();

IllnessRoutes.get('/', async (req, res) => {
    try {
        const illnesses: Illness[] = await GetIllnesses();
        res.status(200).json(illnesses);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

IllnessRoutes.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const illness: Illness | null = await GetIllnessById(new ObjectId(id));
        res.status(200).json(illness);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

IllnessRoutes.post('/', async (req, res) => {
    try {
        const newIllness: Illness = await CreateIllness(req.body);
        res.status(201).json(newIllness);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

IllnessRoutes.put('/:id', async (req, res) => {
    const { id } = req.params;
    const illnessData: Illness = req.body;
    try {
        await UpdateIllness(new ObjectId(id), illnessData);
        res.status(200).json({ message: 'Illness updated successfully' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

IllnessRoutes.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await DeleteIllness(new ObjectId(id));
        res.status(200).json({ message: 'Illness deleted successfully' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

export default IllnessRoutes;