import { FastifyReply, FastifyRequest } from 'fastify';
import { ProductService } from '../services/product.service.js';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/product.dto.js';

export class ProductController {
  constructor(private service: ProductService) {}

  create = async (request: FastifyRequest<{ Body: CreateProductDTO }>, reply: FastifyReply) => {
    const product = await this.service.create(request.body);
    return reply.status(201).send(product);
  }

  list = async (_request: FastifyRequest, reply: FastifyReply) => {
    const products = await this.service.list();
    return reply.send(products);
  }

  getById = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const product = await this.service.getById(request.params.id);
    return reply.send(product);
  }

  update = async (request: FastifyRequest<{ Params: { id: string }, Body: UpdateProductDTO }>, reply: FastifyReply) => {
    const updated = await this.service.update(request.params.id, request.body);
    return reply.send(updated);
  }

  delete = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    await this.service.delete(request.params.id);
    return reply.status(204).send();
  }
}
