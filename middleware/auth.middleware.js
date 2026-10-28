import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.schema.js";

dotenv.config();

export const authMiddleware = async(req,res,next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(! token ){
            return res.status(404).json({
                message:"Invalid token"
            })
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_KEY
        );
        
        const user = await User.findById(decoded._id)
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }
        req.user = user;

        next();
        
    } catch (error) {
        return res.status(401).json({
            message:"Invalid or expired token"
        })
    }
}