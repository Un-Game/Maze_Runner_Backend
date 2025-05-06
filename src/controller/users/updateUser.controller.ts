import { Request, Response } from "express";
import { User } from "../../models/user.model";

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).send("User not found");
    }

    res.status(200).send("User updated");
  } catch (error) {
    console.log("Error occurred", error);
    res.status(400).send("Failed to update user");
  }
};
