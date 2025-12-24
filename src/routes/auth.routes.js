import { Router } from "express";
import { loginUser, logOut, registerUser } from "../controllers/controllers.js";

const authRouter = Router();

authRouter.post("/register",registerUser);
authRouter.post("/login",loginUser);
authRouter.post("/logout", logOut);

export default authRouter;
