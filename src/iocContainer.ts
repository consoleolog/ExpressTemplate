import "reflect-metadata";
import express, {Request, Response} from "express";
import {MetadataKeys} from "./global/config/decorator/metadata.key";
import {MainController} from "./controller/main.controller";
import {NotRegisteredException} from "./global/exception/notRegisteredException";

export class IocContainer {
    private objMap = new Map<Function, any>();

    register<T>(obj: T | any): void {
        this.objMap.set(obj.constructor, obj);
    }

    get<T>(type: new (...args: any[]) => T): T {
        if (!this.objMap.has(type)) {
            throw new NotRegisteredException(type, "Can't Find Type");
        }
        return this.objMap.get(type);
    }

    public compose(app: express.Application | any) {

        const controller: any[] = [
            MainController,
        ];
        controller.forEach((ControllerClass) => {
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
