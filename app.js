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
app.use(cors({
    origin: (origin, callback) => {
       
        const allowedOrigins = ["https://fullstack-todo-ten.vercel.app/", "https://fullstack-todo-ten.vercel.app/login","https://fullstack-todo-ten.vercel.app/register"];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
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
