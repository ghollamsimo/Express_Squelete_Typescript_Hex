import { Request, Response } from "express";
import { UserUseCase } from "../../application/usecases/userUseCase";
import {LoginDTO} from "../../core/dto/LoginDTO";
import {ForgotDTO} from "../../core/dto/ForgotDTO";
import {ResetDTO} from "../../core/dto/ResetDTO";

class UserController {
    private readonly userUseCase
    constructor() {
        this.userUseCase = new UserUseCase()
    }

    async register(req: Request, res: Response): Promise<void> {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({ message: "Name, email, and password are required" });
            return;
        }

        try {
            const user = await this.userUseCase.register( name, email, password );
            res.status(200).json(user);
        } catch (error) {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    }


    async login(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;
            const loginDTO = new LoginDTO(email, password);
            const { token } = await this.userUseCase.login(loginDTO);
            return res.status(200).json({ token });
        } catch (error) {
            return res.status(401).json({ message: "Invalid email or password",});
        }
    }

    async forgotPassword(req: Request, res: Response): Promise<Response> {
        try {
            const { email } = req.body;
            const forgotDTO = new ForgotDTO(email);
            await this.userUseCase.forgotPassword(forgotDTO);
            return res.json({ message: 'Email sent successfully' });
        } catch (err) {
            return res.json({ message: 'Email sending failed' });
        }
    }

    async resetPassword(req: Request, res: Response): Promise<Response> {
        try {
            const { password } = req.body;
            const { resetToken } = req.query;

            if (!resetToken || !password) {
                return res.status(400).json({ message: "Reset token and new password are required" });
            }

            const resetDTO = new ResetDTO(resetToken as string, password);
            await this.userUseCase.resetPassword(resetDTO);

            return res.status(200).json({ message: "Password reset successful" });
        } catch (err) {
            return res.status(500).json({ message: "Password reset failed" });
        }
    }

}

export default new UserController()