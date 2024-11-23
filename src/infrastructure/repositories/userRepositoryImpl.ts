import {UserInterface} from "../../core/interfaces/userInterface";
import {UserEntity} from "../../core/entities/userEntity";
import User from "../database/schema/userSchema";
import * as bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import {LoginDTO} from "../../core/dto/LoginDTO";
import {EmailConfig} from "../../config/emailConfig";

export class UserRepositoryImpl implements UserInterface {
    private readonly userModel;

    constructor() {
        this.userModel = User;
    }

    async register(user: UserEntity): Promise<UserEntity> {
        const saltRounds: number = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
        const newUser = new this.userModel(user);
        const savedUser = await newUser.save();
        return new UserEntity(
            savedUser.name,
            savedUser.email,
            savedUser.password
        );
    }

    async login(loginDTO: LoginDTO): Promise<{ token: string }> {
        const user = await this.userModel.findOne({ email: loginDTO.email });

        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(loginDTO.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );
        return { token };
    }

    async forgotPassword(email: string): Promise<void> {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new Error('User with this email does not exist');
        }
        const resetToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );
        const emailSender: EmailConfig = new EmailConfig(user.email);
        const resetLink: string = `http://localhost:8080/auth/reset-password?token=${resetToken}`;
        return await emailSender.sendEmail({
            to: user.email,
            subject: 'Password Reset',
            text: 'Click on the link to reset your password.',
            html: `<b>Click <a href="${resetLink}">here</a> to reset your password.</b>`
        });
    }


    async resetPassword(resetToken: string, newPassword: string): Promise<{ message: string }> {
        let decoded: { id: string; email: string };

        try {
            decoded = jwt.verify(resetToken, process.env.JWT_SECRET || '') as { id: string; email: string };
        } catch (error) {
            throw new Error('Invalid or expired reset token');
        }

        const user = await this.userModel.findOne({ email: decoded.email });
        if (!user) {
            throw new Error('User not found');
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return { message: 'Password successfully updated' };
    }

}
