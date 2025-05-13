import { Request, Response } from 'express';
import { Map } from '../../models/map.model';


export const createMap = async (req: Request, res: Response) => {
    const { name, layout, start_points } = req.body;

    if (!name || !layout) {
        res.status(400).json({ error: 'Missing required fields: name, layout'});
    }

    try {
        const newMap = new Map({
            name,
            layout
        });

        await newMap.save();

        res.status(201).json({
            message: 'Map created successfully',
            map: newMap
        });
    } catch (error: any) {
        console.error('Error creating map:', error);
        if (error.code === 11000) {
            res.status(409).json({ error: 'Map name already exists' });
        }
        res.status(500).json({ error: 'Failed to create map' });
    }
};