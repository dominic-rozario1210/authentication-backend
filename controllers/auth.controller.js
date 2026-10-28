import User from "../models/user.schema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendResetPasswordMail, sendWelcomeMail } from "../services/email.services.js"

export const register = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                message: "user already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)


        await User.create({
            name,
            email,
            password: hashedPassword
        })

        await sendWelcomeMail(email, name)

        return res.status(201).json({
            message: "user registred successfully "
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "Wrong password"
            })
        }
        
        const token = jwt.sign(
            {
                _id: user.id
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1d"
            }
        )

        return res.status(200).json({
            message: "Login successfull",token
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        const token = jwt.sign(
            {
                _id: user.id
            },
            process.env.JWT_KEY,
            {
                expiresIn: "10m"
            }
        )
        await sendResetPasswordMail(email, token);

        res.status(200).json({
            message: "reset password mail send successfully"
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// export const verifyToken = async (req,res) => {
// const token = req.headers.authorization.split(" ")[1];
// console.log(token);

// try {
//     if(!token){
//         return res.status(401).json({
//             message:"token missing"
//         })
//     }
//     const decoded = jwt.verify(token,process.env.JWT_KEY)

//     const user = await User.findById(decoded._id)

//     if(!user){
//         return res.status(400).json({
//             mesage:"user not found"
//         })
//     }

// } catch (error) {
//     res.status(500).json({
//         error:error.message
//     })
// }
//}

export const verifyToken = (req, res) => {
    res.status(200).json({
        message: "Token verified successfully"
    })
}

// export const changePassword = async (req,res) => {
//     const { newPassword } = req.body;
//     const token = req.headers.authorization.split(" ")[1];
//     try {
//         if(!token){
//             return res.status(401).json({
//                 message:"token missing"
//             })
//         }
//         const decoded = jwt.verify(token,process.env.JWT_KEY)

//         const user = await User.findById(decoded._id)

//         if(!user){
//             return res.status(400).json({
//                 mesage:"user not found"
//             })
//         }

//         const hashedPassword = await bcrypt.hash(newPassword,10);

//         user.password=hashedPassword
//         await user.save();

//         res.status(200).json({
//             message:"password changed successfully"
//         })
//     } catch (error) {
//         res.status(500).json({
//             error:error.message
//         })
//     }
// }
export const changePassword = async (req, res) => {
    const { newPassword } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        req.user.password = hashedPassword

        await req.user.save();

        return res.status(200).json({
            message: "password changed successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const getProfile = async (req,res) =>{
    const { name,email,role } = req.user;

    return res.status(200).json({
        message:"profile fetched successfully",
        user:{
            name,
            email,
            role
        }
    })
}