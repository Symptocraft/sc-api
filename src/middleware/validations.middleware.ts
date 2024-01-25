const validationsMiddleware = {
    email: (email: string) => {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email');
        }
    },
    password: (password: string) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        if (!passwordRegex.test(password)) {
            throw new Error('Password must contain at least 8 characters, one uppercase, one lowercase and one number');
        }
    }
}

export default validationsMiddleware;