import { Map } from "../../models/map.model";
import { Request, Response } from 'express';

export const getMap = async (req: Request, res: Response) => {
    try {
        const mapData = await Map.find({});
        res.send(mapData).status(200)
    } catch (error) {
        res.send().status(400)
        console.log("Error occured ", error);
    }
}