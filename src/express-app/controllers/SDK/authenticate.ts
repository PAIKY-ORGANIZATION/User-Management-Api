import { Request, Response } from 'express';
import { AuthenticateRequestBody } from '../../zodSchemas/user-schema.js';
import { userService } from '../../app-setup.js';
import { Unauthorized } from 'custom-exceptions-express';

export const authenticate = async(req: Request<{}, {}, AuthenticateRequestBody>, res: Response)=>{
	const {cookie} = req.body

	try{ //$ jwt throws an error, it doesn't return null. That is why we use try/catch 
		const payload = userService.verifyToken(cookie)
		console.log({payload});		
		res.send({ message: 'Success', data: payload });
	}catch(e){
		throw new Unauthorized('Invalid token')	
	}

}


