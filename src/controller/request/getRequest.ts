import { Req } from '../../models/request.model';
import { Request, Response } from 'express';

export const getRequest = async (req: Request, res: Response) => {

    try {
        const requests = await Req.find({});

        res.status(200).send(requests);
    } catch (error) {
        console.log("Error occurred ", error);
        res.status(400).send({ message: 'Failed to get request' });
    }
}
