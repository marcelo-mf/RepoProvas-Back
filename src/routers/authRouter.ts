import { Router } from "express";
import * as authControllers from "../controllers/authController.js"

const authRouter = Router();

authRouter.post("/signUp", authControllers.SignUp);
authRouter.post("/signIn", authControllers.SignIn);

export default authRouter;