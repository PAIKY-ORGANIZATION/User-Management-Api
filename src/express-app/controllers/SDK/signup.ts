import { Request, Response } from "express";
import { SignupRequestBody, SignupResponse} from "user-manager-sdk";
import { userService } from "../../app-setup.js";

export const signup = async (req: Request<{}, {}, SignupRequestBody>,res: Response) => {
	const { username, email, password } = req.body;

	const user = await userService.register(email, username, password);

	const response: SignupResponse = { message: 'Success', data: user } //$ The class"user" will be used as an object that looks like: { id: string, email: string, username: string, password: string }


	res.send( response );
};
