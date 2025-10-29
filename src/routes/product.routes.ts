import { FastifyInstance } from 'fastify';
import { ProductController } from '../controllers/product.controller.js';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/product.dto.js';

export const buildProductRoutes = (controller: ProductController) => async (fastify: FastifyInstance) => {

  fastify.post('/', {
    schema: {
      tags: ['Products'],
      body: {
        type: 'object',
        required: ['name', 'price', 'category'],
        properties: {
          name: { type: 'string' },
          price: { type: 'string' },
          category: { type: 'string' },
          is_visible: { type: 'boolean' },
          display_order: { type: 'integer' },
        },
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            price: { type: 'string' },
            category: { type: 'string' },
            is_visible: { type: 'boolean' },
            display_order: { type: 'integer' },
          },
        },
      },
    },
    handler: controller.create,
  });

  fastify.get('/', {
    schema: { tags: ['Products'] },
    handler: controller.list,
  });

  fastify.get('/:id', {
    schema: { tags: ['Products'] },
    handler: controller.getById,
  });

  fastify.put('/:id', {
    schema: {
      tags: ['Products'],
      summary: 'Update an existing product',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
        },
        required: ['id'],
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          price: { type: 'string' },
          category: {
            type: 'string',
            enum: ['entradas', 'pratos_principais', 'sobremesas', 'bebidas'],
          },
          is_visible: { type: 'boolean' },
          display_order: { type: 'integer' },
        },
      },
      response: {
        200: {
          description: 'Product updated successfully',
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            price: { type: 'string' },
            category: { type: 'string' },
            is_visible: { type: 'boolean' },
            display_order: { type: 'integer' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    handler: controller.update.bind(controller),
  });

  fastify.delete('/:id', {
    schema: { tags: ['Products'] },
    handler: controller.delete,
  });
};
