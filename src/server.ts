import Fastify from 'fastify';
import sequelize, { testConnection } from './lib/database.js';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';

import { buildProductRoutes } from './routes/product.routes.js';
import { ProductController } from './controllers/product.controller.js';
import { ProductService } from './services/product.service.js';
import { ProductRepository } from './repositories/product.repository.js';

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


const productRepository = new ProductRepository();


const productService = new ProductService(productRepository);


const productController = new ProductController(productService);


const productRoutes = buildProductRoutes(productController);


server.get('/', async (request, reply) => {
  return reply.status(200).send({ status: 'ok' });
});

server.register(productRoutes, {
  prefix: '/api/products',
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

