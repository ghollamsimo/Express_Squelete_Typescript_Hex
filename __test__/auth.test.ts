import { UserUseCase } from "../src/application/usecases/userUseCase";
import {LoginDTO} from "../src/core/dto/LoginDTO";

jest.mock("../src/application/usecases/userUseCase");

describe("Authentication Tests", () => {
    let userUseCase: UserUseCase;
    beforeEach(() => {
        userUseCase = new UserUseCase;
    })
    it("should call login method", () => {
        const login = jest.spyOn(userUseCase, "login");
        const loginDto: LoginDTO = {
            email: "user@example.com",
            password: "password"
        }
        userUseCase.login(loginDto)
        expect(login).toBeCalledTimes(1);
        expect(login).toBeCalledWith(loginDto);
    })
    it("should call register method", () => {
        const register = jest.spyOn(userUseCase, "register");
        const name: string = "Ghollam";
        const email: string = "ghollam@gmail.com";
        const password: string = "password";
        userUseCase.register(name, email, password);
        expect(register).toHaveBeenCalledTimes(1)
        expect(register).toBeCalledWith(name, email, password);
        expect(register).toReturn();
    })
});
