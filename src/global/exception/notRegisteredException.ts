export class NotRegisteredException extends Error {
    constructor(type: any, message: string) {
        super(`Type ${type.name} - ${message}`);
        this.name = "NotRegisteredException";
    }
}