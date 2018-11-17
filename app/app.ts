import * as restify from 'restify';
import * as echo from './routes/echo';

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

export let server = restify.createServer({
    name: 'varejo-api',
    version: '1.0.0'
});

server.pre(restify.pre.sanitizePath());
server.use(restify.plugins.jsonBodyParser({ mapParams: true }));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.fullResponse());
server.use(restify.plugins.authorizationParser());

echo.setRoutes(server);

server.listen(process.env.PORT || 8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});
