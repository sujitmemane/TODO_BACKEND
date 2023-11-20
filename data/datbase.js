import mongoose from "mongoose"

export const connectDB = () =>{
    mongoose.connect(process.env.MONGODB_URL, {
    dbName: "TODO"
}).then(() => console.log("DB Connected")).catch((err) => console.log("an error occured"))
}