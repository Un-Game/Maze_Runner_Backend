import { Request, Response } from 'express';
import { DirectMessage } from '../../models/directMessage.model';

export const getDirectMessages = async (req: Request, res: Response) => {
  const { user1, user2 } = req.params;

  try {
    const messages = await DirectMessage.find({
      $or: [
        { userId: user1, to: user2 },
        { userId: user2, to: user1 }
      ]
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching DMs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
