import {UserRepositoryImpl} from "../../infrastructure/repositories/userRepositoryImpl";
import {UserEntity} from "../../core/entities/userEntity";
import {LoginDTO} from "../../core/dto/LoginDTO";
import {ForgotDTO} from "../../core/dto/ForgotDTO";
import {ResetDTO} from "../../core/dto/ResetDTO";

export class UserUseCase {
    private readonly userRepository;
    constructor() {
        this.userRepository = new UserRepositoryImpl()
    }

    register(name: string, email: string, password: string): Promise<UserEntity>{
        const user: UserEntity = new UserEntity(name, email, password);
        return this.userRepository.register(user)
    }

    login(LoginDTO: LoginDTO): Promise<{ token: string }> {
        return this.userRepository.login(LoginDTO);
    }

    forgotPassword(ForgotDTO: ForgotDTO): Promise<void> {
        return this.userRepository.forgotPassword(ForgotDTO.email);
    }


    resetPassword(resetDTO: ResetDTO): Promise<{ message: string }>{
        return this.userRepository.resetPassword(resetDTO.resetToken, resetDTO.newPassword)
    }
}