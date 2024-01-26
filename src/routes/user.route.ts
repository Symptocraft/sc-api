import { Router } from "express";
import { ObjectId } from "mongodb";
import { CreateUser, DeleteUser, GetUserById, GetUsers, UpdateUser } from "../services/users";
import { User } from "../types/user.types";


const UserRoutes = Router();

UserRoutes.get("/", async (req, res) => {
    try {
        const users:User[] = await GetUsers();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

UserRoutes.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user: User | null = await GetUserById(new ObjectId(id));
        res.status(200).json(user);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

UserRoutes.post("/", async (req, res) => {
    try {
        const newUser:User = await CreateUser(req.body);
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

UserRoutes.put("/:id", async (req, res) => {
    const { id } = req.params;
    const userData:User = req.body;
    try {
        await UpdateUser(new ObjectId(id), userData);
        res.status(200).json({ message: "User updated successfully" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

UserRoutes.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await DeleteUser(new ObjectId(id));
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});



export default UserRoutes;