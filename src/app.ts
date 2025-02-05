import "reflect-metadata";
import express from "express";
import http from "http";
import { IocContainer } from "./iocContainer";
import {MainController} from "./controller/main.controller";

export class App {
    public app: express.Application;
    private server?: http.Server;
    private container: IocContainer;

    constructor() {
        this.app = express();
        this.container = new IocContainer();
        this.setMiddlewares();
        this.registerControllers();
    }

    private setMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private registerControllers(): void {
        this.container.register(MainController);
    }

    public async bootstrap(port: number): Promise<http.Server> {
        return new Promise((resolve, reject) => {
            try {
                this.container.compose(this.app); // 컨트롤러 자동 등록

                this.server = this.app.listen(port, "0.0.0.0", () => {
                    console.log(`Listening on http://localhost:${port}`);
                    resolve(this.server!);
                });
            } catch (error) {
                console.error("Start Failed", error);
                reject(error);
            }
        });
    }
}
