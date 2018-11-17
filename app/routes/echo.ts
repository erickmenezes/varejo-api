import { Server } from 'restify';

import * as Controller from "../controllers/echo";

export function setRoutes(server: Server) {
  server.get('/echo', Controller.get);
  server.get('/echo/:message', Controller.get);
}
