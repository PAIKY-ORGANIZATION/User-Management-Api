import { Request, Response } from 'express';
import { AuthenticateRequestBody } from 'user-manager-sdk';
import { userService } from '../../app-setup.js';
import { Unauthorized } from 'custom-exceptions-express';

export const authenticate = async(req: Request<{}, {}, AuthenticateRequestBody>, res: Response)=>{
	const {token} = req.body


	try{ //$ jwt throws an error, it doesn't return null. That is why we use try/catch 
		const payload = userService.verifyToken(token)
		
		const response: ServerResponse = {
			message: 'Success',
			success: true,
			data: payload
		}

		res.send(response);
	}catch(e){
		throw new Unauthorized('Invalid token')	
	}

}




