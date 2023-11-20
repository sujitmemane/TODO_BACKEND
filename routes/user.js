import express from "express"
import { User } from "../models/user.js"
import {  getUser, register, login,logout ,getMyProfile} from "../controllers/user.js"
import { isAuthenticated } from "../middlewares/auth.js"

const router = express.Router()



router.get("/me",isAuthenticated , getMyProfile)

// authentication 

router.get("/logout",logout)
router.post("/register", register)
router.post("/login", login)

router.get("/:id",getUser)


export default router