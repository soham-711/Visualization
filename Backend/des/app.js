"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const AlgoRouter_1 = __importDefault(require("./router/AlgoRouter"));
const app = (0, express_1.default)();
// ✅ Correct CORS Middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // ✅ Your frontend URL (Vite)
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    console.log("Server hit: /");
    res.send("Hello");
});
app.use("/algorithm", AlgoRouter_1.default);
app.listen(4000, () => {
    console.log("🚀 Server is running on port 4000");
});
