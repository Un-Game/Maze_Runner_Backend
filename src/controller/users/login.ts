import {Response, Request } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../../models/user.model"

export const loginAuthentication = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({email});

        if (!user) {
            res.status(400).json({ success: false, message: "Account not found" })
        } else {
            const match = await bcrypt.compare(password, user.password);
            const decodePass = "123";
            if (match) {
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + 60 * 60, date: user
                }, decodePass);
                const userData = {email: user.email }
                res.status(200).json({ success: true, message: "logged in", token: token, userData: userData });
            } else {
                res.status(400).json({ success: false, message: "password incorrect" })
            }
        }
    } catch (error) {
        res.send("Server error (auth)").status(500)
        console.log(error);
    }
}