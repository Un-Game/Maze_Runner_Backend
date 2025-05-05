import { Control } from "../../models/control.model";
import { Request, Response } from "express";

export const getKeybind = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const controlData = await Control.findById(id);
    if (!controlData) {
      res.status(404).json({ message: "Control not found" });
      return;
    }
    res.status(200).json({ message: "Control found" });
  } catch (error) {
    res.status(400).json({ message: "Error has been occurred", error });
  }
};
