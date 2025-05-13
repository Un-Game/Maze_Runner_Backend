import { Map } from "../../models/map.model";
import { Request, Response } from 'express';

export const findMap = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const mapData = await Map.findById(id);
        res.send(mapData).status(200)
    } catch (error) {
        res.send().status(400)
        console.log("Error occured ", error);
    }
}