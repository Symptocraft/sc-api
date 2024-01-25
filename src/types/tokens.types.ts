import { ObjectId } from "mongodb";

type TokenPayload = {
    id: ObjectId;
    email: string;
    username: string;
    role: number;
}

export type { TokenPayload };