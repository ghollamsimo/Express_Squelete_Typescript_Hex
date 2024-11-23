import request from "supertest";
import { app } from "../src/app";
import { UserUseCase } from "../src/application/usecases/userUseCase";

jest.mock("../src/application/usecases/userUseCase");
let mockAuth: jest.Mock;

describe("POST /auth/register", () => {
    beforeEach(() => {
        mockAuth = jest.fn();
        (UserUseCase as jest.Mock).mockImplementation(() => ({
            register: mockAuth,
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return 201 on successful registration", async () => {
        mockAuth.mockResolvedValueOnce({
            name: "test",
            email: "test@example.com",
        });

        const response = await request(app)
            .post("/auth/register")
            .send({ name: "test", email: "test@example.com", password: "password123" });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            name: "test",
            email: "test@example.com",
        });
    });

    it("should return 400 if required fields are missing", async () => {
        const response = await request(app).post("/auth/register").send({});

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Name, email, and password are required");
    });
});

describe("POST /auth/login", () => {
    beforeEach(() => {
        mockAuth = jest.fn();
        (UserUseCase as jest.Mock).mockImplementation(() => ({
            login: mockAuth,
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return 200 for a successful login", async () => {
        mockAuth.mockResolvedValueOnce({
            token: "token",
        });

        const response = await request(app)
            .post("/auth/login")
            .send({ email: "test@example.com", password: "password123" });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            token: "token",
        });
    });

    it("should return 401 for invalid credentials", async () => {
        mockAuth.mockRejectedValueOnce(new Error("Invalid email or password"));

        const response = await request(app)
            .post("/auth/login")
            .send({ email: "invalid@example.com", password: "wrongpassword" });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Invalid email or password");
    });
});
