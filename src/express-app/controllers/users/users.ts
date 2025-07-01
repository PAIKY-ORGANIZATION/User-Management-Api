import { Request, Response } from 'express';
import { LoginSchemaType, SignupSchemaType } from '../../zodSchemas/user-schema.js';
import { BadRequest } from '../../lib/exceptions.js';


export const signup = async (req: Request<{}, {}, SignupSchemaType>,res: Response) => {
	const { username, email, password } = req.body;

	res.send({ message: 'Success', data: { username, email, password } });
};

export const signin = async (req: Request<{}, {}, LoginSchemaType>, res: Response) => {
	const { email, password } = req.body;
    
	res.send({ message: 'Success', data: { email, password } });
};

export const triggerBadRequest = async (_req: Request, _res: Response) => {
	
    throw new BadRequest('Bad request');

};
