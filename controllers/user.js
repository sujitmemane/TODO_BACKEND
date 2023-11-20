import { User } from "../models/user.js"
import bcrypt from "bcrypt"

import { sendCookie } from "../utils/features.js"

import { ErrorHandler } from "../middlewares/error.js"



export const getAllUsers = async (req, res) => {

}


export const getUser = async (req, res) => {

}

export const getMyProfile = (req, res,next) => {

    try {
        res.status(200).json({
            success: true,
            message: "Here is profile",
            user: req.user
        })
    } catch (error) {
        next(error)
    }

}


export const register = async (req, res,next) => {

    try {
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)

        let user = await User.findOne({ email })
        if (user) return next(new ErrorHandler("User Already Exist", 400));



        user = await User.create({ name, email, password: hashedPassword })

        sendCookie(user, res, "User Registerd Successfully", 201)
    } catch (error) {
        next(error)

    }

}
export const login = async (req, res,next) => {

    try {
        const { email, password } = req.body
        let user = await User.findOne({ email }).select("+password")
        if (!user) return next(new ErrorHandler("Invalid Password or Email ", 400));

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return next(new ErrorHandler("Invalid Password or Email ", 400))

        sendCookie(user, res, `Welcome Back , ${user.name}`, 200)

    } catch (error) {
        next(error)
    }



}


export const logout = (req, res,next) => {

    try {
        res.status(200).cookie("token", "", { expires: new Date(Date.now()) }).json({
            success: true,
            message: "User Logout Successfull!",

        })
    } catch (error) {
        next(error)
    }
}