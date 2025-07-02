import { Router } from "express";
import { validate } from "../middleware/validateBody.js";
import { loginSchema, signupSchema } from "../zodSchemas/user-schema.js";
import { signup } from "../controllers/SDK/signup.js";
import { signin } from "../controllers/SDK/signin.js";
import { authenticate } from "../controllers/SDK/authenticate.js";
//*types:





export const router = Router();


router.post('/signup', validate(signup, signupSchema) )

router.post('/signin', validate(signin, loginSchema))

router.post('/authenticate', validate(authenticate))


