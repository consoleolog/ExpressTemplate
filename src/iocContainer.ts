import "reflect-metadata";
import express, {Request, Response} from "express";
import {MetadataKeys} from "./decorator/metadata.key";

export class IocContainer {
    private controllers: any[] = [];

    public register(controller: any) {
        this.controllers.push(controller);
    }

    public compose(app: express.Application | any) {
        this.controllers.forEach((ControllerClass) => {
            const basePath = Reflect.getMetadata(MetadataKeys.BASE_PATH, ControllerClass);
            if (!basePath) return;

            const controllerInstance = new ControllerClass();
            const proto = Object.getPrototypeOf(controllerInstance);

            Object.getOwnPropertyNames(proto).forEach((methodName) => {
                const routePath = Reflect.getMetadata(MetadataKeys.ROUTE_PATH, proto, methodName);
                const methodType = Reflect.getMetadata(MetadataKeys.METHOD_TYPE, proto, methodName);

                if (routePath && methodType) {
                    const fullPath = `${basePath}${routePath}`;
                    app[methodType](fullPath, (req: Request, res: Response) => controllerInstance[methodName](req, res));
                    console.log(`Registered Route: [${methodType.toUpperCase()}] ${fullPath}`);
                }
            });
        });
    }
}
