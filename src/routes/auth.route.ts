import { Router } from "express";
import UserController from "../interface/http/userController";

const authRouter: Router = Router();

authRouter.post("/auth/register", (req, res): void => {
    UserController.register(req, res);
});

authRouter.post('/auth/login', (req, res): void => {
    UserController.login(req, res);
})

authRouter.post('/auth/forgot-password', (req, res): void => {
    UserController.forgotPassword(req, res);
})

authRouter.post('/auth/reset-password', (req, res): void => {
    UserController.resetPassword(req, res);
})
export default authRouter;
