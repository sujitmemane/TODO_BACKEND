
import app from "./app.js";
import { connectDB } from "./data/datbase.js";


connectDB()


console.log(process.env.PORT)

app.listen()
