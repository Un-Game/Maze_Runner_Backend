import { Request, Response } from "express";
import { User } from "../../models/user.model";
import bcrypt from "bcrypt";

export const updatePassword = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
        if (!password) {
            res.status(400).send("Password is required");
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { password: hashedPassword },
            { new: true }
        );

        if (!updatedUser) {
            res.status(404).send("User not found");
        }

        res.status(200).send("Password updated successfully");
    } catch (error) {
        console.error("Error occurred", error);
        res.status(400).send("Failed to update password");
    }
};
