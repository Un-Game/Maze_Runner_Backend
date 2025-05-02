import { Request, Response } from "express";
import { User } from "../../models/user.model";

export const updateUser = async (req: Request, res: Response) => {
  const { email, password, username, avatar, exp, control } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      { email, password, username, avatar, exp},
      { control },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).send("User not found");
    }

    res.send("User updated").status(200);
  } catch (error) {
    res.send().status(400);
    
    console.log("Error occured ", error);
  }
};
