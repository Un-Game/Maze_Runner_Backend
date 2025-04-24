import { Request, Response } from 'express';
import { Map } from '../../models/map.model';

export const updateMap = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, layout, start_points } = req.body;

    try {
        const updatedMap = await Map.findByIdAndUpdate(
            id,
            {
                ...(name && { name }),
                ...(layout && { layout }),
                ...(start_points && { start_points }),
            },
            { new: true, runValidators: true }
        );

        if (!updatedMap) {
            res.status(404).json({ error: 'Map not found' });
        }

        res.status(200).json({
            message: 'Map updated successfully',
            map: updatedMap,
        });
    } catch (error) {
        console.error('Error updating map:', error);
        res.status(400).json({ error: 'Failed to update map' });
    }
};
