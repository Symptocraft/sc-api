import mongoose, { model } from "mongoose";
import { User } from "../types/user.types";

const UserSchema = new mongoose.Schema<User>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, default: 1, required: true },
});

const UserModel = model<User>("User", UserSchema);

export default UserModel;