import {UserEntity} from "../entities/userEntity";
import {LoginDTO} from "../dto/LoginDTO";

export interface UserInterface {
    register(user: UserEntity): Promise<UserEntity>
    login(loginDto:LoginDTO): Promise<{token: string}>

    forgotPassword(email: string): Promise<void>
    resetPassword(resetToken: string, newPassword: string): Promise<{ message: string }>
}