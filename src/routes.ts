import express from 'express';
import knex from './database/connection';

// Decouple routes to this file.
const routes = express.Router();

routes.get('/items', async (request, response) => {
  const items = await knex('items').select('*');

  const serializedItems = items.map((item) => {
    return {
      id: item.id,
      name: item.title,
      image_url: `http://localhost:3333/assets/${item.image}`,
    };
  });
  return response.json(serializedItems);
});

routes.post('/points', async (request, response) => {
  const {name, email, whatsapp, latitude, longitude, city, uf, items} = request.body;

  // Transaction for chained queries.
  const trx = await knex.transaction();

  const insertedIds = await trx('points').insert({
    image: 'image-fake',
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
  });

  const point_id = insertedIds[0];

  const pointItems = items.map((item_id: number) => {
    return {
      item_id,
      point_id,
    };
  });

  await trx('point_items').insert(pointItems);

  return response.json({success: true});
});

export default routes;
