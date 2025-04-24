import { Request, Response } from 'express';
import { Map } from '../../models/map.model';

export const deleteMap = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedMap = await Map.findByIdAndDelete(id);

        if (!deletedMap) {
            res.status(404).json({ error: 'Map not found' });
        }

        res.status(200).json({
            message: 'Map deleted successfully',
            map: deletedMap
        });
    } catch (error) {
        console.error('Error deleting map:', error);
        res.status(500).json({ error: 'Failed to delete map' });
    }
};
