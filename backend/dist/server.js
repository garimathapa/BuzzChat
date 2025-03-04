"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ws_1 = require("ws");
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// WebSocket setup
var server = app.listen(PORT, function () { return console.log("Server running on port ".concat(PORT)); });
var wss = new ws_1.WebSocketServer({ server: server });
wss.on("connection", function (ws) {
    console.log("New client connected");
    ws.on("message", function (message) {
        console.log("Received: ".concat(message));
        wss.clients.forEach(function (client) {
            if (client.readyState === ws.OPEN) {
                client.send(message.toString());
            }
        });
    });
    ws.on("close", function () { return console.log("Client disconnected"); });
});
