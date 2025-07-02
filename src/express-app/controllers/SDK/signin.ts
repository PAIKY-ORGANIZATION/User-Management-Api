import { Request, Response } from "express";
import {LoginRequestBody} from "user-manager-sdk";
import { userService } from "../../app-setup.js";

export const signin = async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
	const { email, password } = req.body;
    const {token} = await userService.login(email, password);
	res.send({ message: 'Success', data: { email, password, token } });
};
