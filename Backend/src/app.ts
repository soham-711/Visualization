import express from 'express'
const app=express();
import algo_router  from "./router/AlgoRouter"

app.get("/",(req,res)=>{
    res.send("hell0")
})
app.use("/algorithm",algo_router)
app.listen(4000,()=>{
    console.log("server is running")
})