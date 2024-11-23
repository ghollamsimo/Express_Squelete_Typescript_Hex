import { Router } from "express";
import UserController from "../interface/http/userController";

const router: Router = Router();

router.post("/auth/register", (req, res): void => {
    UserController.register(req, res);
});

router.post('/auth/login', (req, res): void => {
    UserController.login(req, res);
})

router.post('/auth/forgot-password', (req, res): void => {
    UserController.forgotPassword(req, res);
})

router.post('/auth/reset-password', (req, res): void => {
    UserController.resetPassword(req, res);
})
export default router;
