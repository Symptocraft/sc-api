import e, { Router } from "express";
import { ObjectId } from "mongodb";
import { CreateSymptom, DeleteSymptom, GetSymptomById, GetSymptoms, UpdateSymptom } from "../services/symptom";
import { Symptom } from "../types/symptom.types";

const SymptomRoutes = Router();

SymptomRoutes.get("/", async (req, res) => {
    try {
        const symptoms:Symptom[] = await GetSymptoms();
        res.status(200).json(symptoms);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

SymptomRoutes.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const symptom: Symptom | null = await GetSymptomById(new ObjectId(id));
        res.status(200).json(symptom);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

SymptomRoutes.post("/", async (req, res) => {
    try {
        const newSymptom:Symptom = await CreateSymptom(req.body);
        res.status(201).json(newSymptom);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

SymptomRoutes.put("/:id", async (req, res) => {
    const { id } = req.params;
    const symptomData:Symptom = req.body;
    try {
        await UpdateSymptom(new ObjectId(id), symptomData);
        res.status(200).json({ message: "Symptom updated successfully" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

SymptomRoutes.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await DeleteSymptom(new ObjectId(id));
        res.status(200).json({ message: "Symptom deleted successfully" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

export default SymptomRoutes;