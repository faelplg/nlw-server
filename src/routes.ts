// Possible enhancements
// // Service Pattern
// // Repository Pattern (Data Mapper)

import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

// Decouple routes to this file.
const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', );

// index: list all
// show: get single
// create: create new one
// update: update one
// delete: delete one

routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;
