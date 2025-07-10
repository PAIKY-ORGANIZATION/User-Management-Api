import { Router } from "express";
import { validate } from "../middleware/validateBody.js";
import { signup } from "../controllers/SDK/signup.js";
import { login } from "../controllers/SDK/login.js";
import { authenticate } from "../controllers/SDK/authenticate.js";
import {loginSchema, signupSchema} from "user-manager-sdk"


export const router = Router();


router.post('/signup', validate(signup, signupSchema))

router.post('/login', validate(login, loginSchema))

router.post('/authenticate', validate(authenticate))









//* About zod schemas from "user-manager-sdk":
//¡ If you are importing the zod schemas from  "user-manager-sdk" and you are running this code along the LINKED version of ""user-manager-sdk", this will no be  detected as a ZodError. Instead it will be an internal server error.
// ¡ Run this code with  \ npm i "user-manager-sdk" \  instead of npm link "user-manager-sdk" for this section to work or declare the zod in this server
