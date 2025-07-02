import { Request, Response } from "express";
import { SignupSchemaType } from "../../zodSchemas/user-schema.js";
import { userService } from "../../app-setup.js";

export const signup = async (req: Request<{}, {}, SignupSchemaType>,res: Response) => {
	const { username, email, password } = req.body;

	await userService.register(email, username, password);

	res.send({ message: 'Success', data: { username, email, password } });
};
