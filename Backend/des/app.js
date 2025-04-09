"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const AlgoRouter_1 = __importDefault(require("./router/AlgoRouter"));
app.get("/", (req, res) => {
    res.send("hell0");
});
app.use("/algorithm", AlgoRouter_1.default);
app.listen(4000, () => {
    console.log("server is running");
});
