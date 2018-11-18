import { Server } from 'restify';

import ProductController from "../controllers/product";

export function setRoutes(server: Server) {
  const Controller = new ProductController();

  server.get('/products', Controller.get);
}
