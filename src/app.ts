import express, { Application, Request, Response, NextFunction } from "express";
import router from "./routes/routes";
import dotenv from "dotenv";
import connectToDB from "./config/settings";

dotenv.config();

class Server {
    public app: Application;
    private readonly port: string | number;

    constructor(port: string | number = process.env.APP_PORT || 8080) {
        this.port = port;
        this.app = express();
        this.config();
        this.routing();
    }

    private config(): void {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            next();
        });
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    private routing(): void {
        this.app.use("/", router);
    }

    public async start(): Promise<void> {
        await connectToDB();
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

// Export an instance of Server for testing
const server = new Server();
export const app = server.app; // Export app for tests
export default server;
