import { Request, Response } from "express";
import {LoginRequestBody} from "user-manager-sdk";
import { userService } from "../../app-setup.js";

export const login = async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
	// const { email, password } = req.body; //$ This will be passed directly instead
    const {token} = await userService.login(req.body);
	res.send({ message: 'Success', success: true, data: { token } });
};
