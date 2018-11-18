import * as fs from 'fs';
import * as restify from 'restify';

import mongoose = require('mongoose');
import corsMiddleware = require('restify-cors-middleware');

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

export let server = restify.createServer({
    name: 'varejo-api',
    version: '1.0.0'
});

const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ['*'],
  allowHeaders: ['API-Token'],
  exposeHeaders: ['API-Token-Expiry']
});

server.pre(cors.preflight);
server.use(cors.actual);
server.pre(restify.pre.sanitizePath());
server.use(restify.plugins.jsonBodyParser({ mapParams: true }));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.fullResponse());
server.use(restify.plugins.authorizationParser());

server.listen(process.env.PORT || 8080, () => {
  mongoose.Promise = global.Promise;

  let dbHost = process.env.DB_HOST || '127.0.0.1';
  let dbPort = process.env.DB_PORT || '27017';
  let dbName = process.env.DB_NAME || 'varejo';

  let dbUrl = dbHost + ':' + dbPort + '/' + dbName

  if (process.env.NODE_ENV !== 'dev') {
    dbUrl = process.env.DB_USER + ':' + process.env.DB_PASS + '@' + dbUrl;
  }

  mongoose.connect('mongodb://' + dbUrl, {useMongoClient: true});
  
  const db = mongoose.connection;

  db.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });

  db.once('open', () => {
    setAllRoutes();

    console.log('%s listening at %s', server.name, server.url);
  });

});

function setAllRoutes() {
  fs.readdirSync(__dirname + '/routes').forEach((routeConfig: string) => {
    if (routeConfig.substr(-3) === '.js' && routeConfig !== 'index.js') {
      const route = require(__dirname + '/routes/' + routeConfig);
      route.setRoutes(server);
    }
  });
}
