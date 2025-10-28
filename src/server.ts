import Fastify from 'fastify';
import sequelize, { testConnection } from './lib/database.js';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';

const server = Fastify({
  logger: true,
});

const PORT = Number(process.env.PORT) || 3333;

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Goomer Menu API',
      description: 'API for restaurant menu management.',
      version: '1.0.0',
    },
    servers: [
      { url: `http://localhost:${PORT}`, description: 'Development Server' }
    ],
    tags: [
      { name: 'Products', description: 'Product Endpoints' },
      { name: 'Promotions', description: 'Promotion Endpoints' },
      { name: 'Menu', description: 'Menu Endpoint' },
    ],
  },
});

server.register(fastifySwaggerUI, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: true,
  },
});

server.get('/', async (request, reply) => {
  return reply.status(200).send({ status: 'ok' });
});

const start = async () => {
  try {
    await testConnection();

    await server.listen({
      port: PORT,
      host: '0.0.0.0',
    });

    server.log.info(`Server running at http://localhost:${PORT}`);
    server.log.info(`API Documentation at http://localhost:${PORT}/docs`);

  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();

