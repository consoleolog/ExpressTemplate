import "reflect-metadata";
import {MetadataKeys} from "./metadata.key";

const createMethodDecorator = (method: string) => (path: string): MethodDecorator => {
    return (target, propertyKey) => {
        Reflect.defineMetadata(MetadataKeys.ROUTE_PATH, path, target, propertyKey);
        Reflect.defineMetadata(MetadataKeys.METHOD_TYPE, method, target, propertyKey);
    };
};

export const GetMapping = createMethodDecorator("get");
export const PostMapping = createMethodDecorator("post");
export const PutMapping = createMethodDecorator("put");
export const DeleteMapping = createMethodDecorator("delete");
