import { GenerateSecretToken } from "../services/tokens";

const CreateCookie = (newUser) => {
    const token = GenerateSecretToken({
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        role: 1,
    });
    
    const Cookie = {
        token,
        options: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"? true : false,
            domain: process.env.APP_URL,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
    }

    return Cookie;
}

export { CreateCookie };