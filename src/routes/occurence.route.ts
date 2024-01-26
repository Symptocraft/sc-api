import { Router } from "express";
import { ObjectId } from "mongodb";
import { CreateOccurence, DeleteOccurence, GetOccurenceById, GetOccurences, UpdateOccurence } from "../services/occurence";
import { SymptomOccurence } from "../types/occurence.types";

const OccurenceRoutes = Router();

OccurenceRoutes.get("/", async (req, res) => {
    try {
        const occurences:SymptomOccurence[] = await GetOccurences();
        res.status(200).json(occurences);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

OccurenceRoutes.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const occurence: SymptomOccurence | null = await GetOccurenceById(new ObjectId(id));
        res.status(200).json(occurence);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

OccurenceRoutes.post("/", async (req, res) => {
    try {
        const newOccurence:SymptomOccurence = await CreateOccurence(req.body);
        res.status(201).json(newOccurence);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

OccurenceRoutes.put("/:id", async (req, res) => {
    const { id } = req.params;
    const occurenceData:SymptomOccurence = req.body;
    try {
        await UpdateOccurence(new ObjectId(id), occurenceData);
        res.status(200).json({ message: "Occurence updated successfully" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

OccurenceRoutes.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await DeleteOccurence(new ObjectId(id));
        res.status(200).json({ message: "Occurence deleted successfully" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

export default OccurenceRoutes;