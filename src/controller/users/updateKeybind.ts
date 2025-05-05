import { Control } from "../../models/control.model";
import { Request, Response } from "express";

export const updateKeybind = async (req: Request, res: Response) => {
  const { up, down, left, right, skill1, skill2, skill3 } = req.body;
  try {
    const UpdateKeybind = await Control.findByIdAndUpdate(
      { up, down, left, right, skill1, skill2, skill3 },
      { new: true }
    );
    if (!UpdateKeybind) {
      res.status(404).json({ message: "Keybind now found" });
    }
    res.status(200).json({ message: "Keybind updated" });
  } catch (error) {
    res.status(400).json({ message: "Error has been occurred", error});
  }
};
