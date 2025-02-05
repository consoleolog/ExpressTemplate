import { App } from "./app";
import http from "http";

let server: http.Server;

const app = new App();
app.bootstrap(3000).then((httpServer) => {
    server = httpServer;
});
process.on("SIGINT", async () => {
    if (server) {
        server.close(() => {
            console.log("Server closed.");
        });
    }
});
process.on('SIGTERM', () => {
    server.close(() => {
        console.log("Server closed.");
    })
})
