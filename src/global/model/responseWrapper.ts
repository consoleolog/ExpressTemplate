
export class ResponseWrapper {
    timestamp = new Date().toISOString();
    data: any;
    params: any;
    constructor(data: any = {}, params: any = {}) {
        this.data = data;
        this.params = params;
    }
}