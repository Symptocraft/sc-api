import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyAuth = (req: Request, res: Response) => {
        if (!req.cookies)
            return res.status(403).send({
                message: "Auth Is Required!"
            });
        const token = req.cookies.token;
        if (!token) {
            return res.status(403).send({
                message: "No token provided!"
            });
        }
    
        jwt.verify(token, process.env.JWT_SECRET || '', 
            (err: any) => {
                    if (err) {
                            return res.status(401).send({
                            message: "Unauthorized!",
                            });
                    }
                    return;
            });

        return;
      };
      

export default verifyAuth;