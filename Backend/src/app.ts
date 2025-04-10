import express from 'express';
import cors from 'cors';
import algo_router from "./router/AlgoRouter";

const app = express();

// ✅ Correct CORS Middleware
app.use(cors({
    origin: "https://visualization-of-page-replacement-algo-f3nt.onrender.com", // ✅ Your frontend URL (Vite)
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
    console.log("Server hit: /");
    res.send("Hello");
});

app.use("/algorithm", algo_router);

app.listen(4000, () => {
    console.log("🚀 Server is running on port 4000");
});
