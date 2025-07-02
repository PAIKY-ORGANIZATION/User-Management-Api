import { Request, Response } from "express";
import { LoginSchemaType } from "../../zodSchemas/user-schema.js";
import { userService } from "../../app-setup.js";

export const signin = async (req: Request<{}, {}, LoginSchemaType>, res: Response) => {
	const { email, password } = req.body;
    const {token} = await userService.login(email, password);
	res.send({ message: 'Success', data: { email, password, token } });
};
