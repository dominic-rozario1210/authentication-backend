import express from "express";
import mongoose from "mongoose";
import dotevn from "dotenv";
import cors from "cors"
import authRouter from "./router/auth.router.js";
import connectDB from "./database/db.configure.js";

dotevn.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter)

await connectDB();
app.listen(process.env.PORT, () => {
    console.log("app started listening");
    
})

