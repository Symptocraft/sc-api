import UserModel from "../../models/user.model";
import { UserLogin } from "../../types/user.types";
import bcrypt from "bcrypt";

const LoginUser = async (userData:UserLogin) => {
    const { email, password } = userData;
    try {
        // Check if all fields are provided
        if (!email || !password) {
            throw new Error('All fields are required');
        }
        // Check if user exists
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            throw new Error('Check your credentials and try again!');
        }
        // Check if password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Check your credentials and try again!');
        }
        return user;
    } catch (error) {
        throw new Error('Bad Request');
    }
}

export { LoginUser };