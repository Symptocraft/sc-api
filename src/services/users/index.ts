import { ObjectId } from "mongodb";
import UserModel from "../../models/user.model";
import { User } from "../../types/user.types";
import bcrypt from "bcrypt";
import validationsMiddleware from "../../middleware/validations.middleware";

const GetUsers = async () => {
    try {
        const users:User[] = await UserModel.find();
        return users;
    } catch (error) {
        throw new Error('Bad Request');
    }
}

const GetUserById = async (id:ObjectId) => {
    try {
        const user:User | null = await UserModel.findOne({ _id: id });
        return user;
    } catch (error: any) {
        throw new Error(error.message || 'Bad Request');
    }
}

const CreateUser = async (userData:User) => {
    const { firstName, lastName, email, username, password } = userData;
    try {
        // Check if all fields are provided
        if (!firstName || !lastName || !email || !username || !password) {
            throw new Error('All fields are required');
        }
        // Check if user already exists
        const oldUser = await UserModel.findOne({ email: email });
        if (oldUser) {
            throw new Error('User already exists');
        }
        
        validationsMiddleware.email(email);
        validationsMiddleware.password(password);

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new UserModel({
            firstName,
            lastName,
            email,
            username,
            password: passwordHash,
        });
        // Save the user
        const newUser = await user.save();
        return newUser;
    } catch (error:any) {
        throw new Error(error.message || 'Bad Request');
    }
}

const UpdateUser = async (id:ObjectId, userData:User) => {
    //Update only the fields that are provided
    const { firstName, lastName, email, username, password } = userData;
    try {
        const user = await UserModel.findOne({ _id: id });
        if (!user) {
            throw new Error('User not found');
        }
        if (firstName) {
            user.firstName = firstName;
        }
        if (lastName) {
            user.lastName = lastName;
        }
        if (email) {
            user.email = email;
        }
        if (username) {
            user.username = username;
        }
        if (password) {
            user.password = password;
        }
        const updatedUser = await user.save();
        return updatedUser;
    } catch (error:any) {
        throw new Error(error.message || 'Bad Request');
    }
}

const DeleteUser = async (id:ObjectId) => {
    try {
        await UserModel.deleteOne({ _id: id });
        return;
    } catch (error:any) {
        throw new Error(error.message || 'Bad Request');
    }
}



export { GetUsers, CreateUser, GetUserById, UpdateUser, DeleteUser};
