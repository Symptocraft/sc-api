import jwt from 'jsonwebtoken';
import { TokenPayload } from '../../types/tokens.types';

const GenerateSecretToken = (data:TokenPayload) => {
    return jwt.sign({data}, process.env.JWT_SECRET as string, {
        expiresIn: '1d',
    });
}

export { GenerateSecretToken };