import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"


dotenv.config({
    path: "./data/config.env"
})




export const app = express()
const allowedOriginBase = "http://localhost:5173/";

app.use(cors({
    // origin: (origin, callback) => {
    //     const isAllowed = !origin || origin.startsWith(allowedOriginBase);
    //     if (isAllowed) {
    //         callback(null, true);
    //     } else {
    //         callback(new Error("Not allowed by CORS"));
    //     }
    // },
    origin:"*",
    credentials: true,
}));


app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tasks", taskRouter)


app.get("/me", (req, res) => {
    res.end("Hello I am Sujit Memane")
})


app.use(errorMiddleware)



export default app
