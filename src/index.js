import express from "express";
import helmet from "helmet";
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import {connectDb} from "./config/config.js";
import {errorHandler} from "./utils/utils.js";
import { authRouter, taskRouter } from "./routes/routes.js";

//configure env variable
dotenv.config();

const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ["Content-Type", "Authorization"],
};

//middleware's

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/tasks",taskRouter);

connectDb().then(()=>{
    app.listen(process.env.PORT || 9000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    });
})
    