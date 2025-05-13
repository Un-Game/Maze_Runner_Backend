import express from 'express'
import { getMap } from '../controller/map/getMap.controller';
import { createMap } from '../controller/map/createMap.controller';
import { deleteMap } from '../controller/map/deleteMap.controller';
import { updateMap } from '../controller/map/updateMap.controller';
import { findMap } from '../controller/map/findMap.controller';

export const mapRouter = express.Router();

mapRouter.get("/", getMap);
mapRouter.get("/:id", findMap);
mapRouter.post("/", createMap);
mapRouter.put("/:id", updateMap);
mapRouter.delete("/:id", deleteMap);