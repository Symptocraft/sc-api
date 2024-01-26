type User = {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    role: number,
};

type UserLogin = {
    email: string,
    password: string,
};

export { User, UserLogin };