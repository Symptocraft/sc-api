import { Router } from "express";
import { CreateUser } from "../services/users";
import { CreateCookie } from "../middleware/cookies.middleware";
import { User } from "../types/user.types";
import { LoginUser } from "../services/auth";

const AuthRoutes = Router();

AuthRoutes.post("/register", async (req, res) => {
    try {
        const newUser:User = await CreateUser(req.body);
        if (newUser){
            const cookieObject = CreateCookie(newUser);
            res.cookie("token", cookieObject.token, cookieObject.options);
            res.status(201).json(newUser);
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

AuthRoutes.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const userObject:User = await LoginUser({ email, password });
        if (userObject) {
            const cookieObject = CreateCookie(userObject);
            res.cookie("token", cookieObject.token, cookieObject.options);
            res.status(200).json(userObject);
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

AuthRoutes.post("/logout", async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

export default AuthRoutes;