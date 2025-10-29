import { ProductRepository } from '../repositories/product.repository.js';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/product.dto.js';

export class ProductService {
  constructor(private repository: ProductRepository) {}

  async create(data: CreateProductDTO) {
    return this.repository.create(data);
  }

  async list() {
    return this.repository.findAll();
  }

  async getById(id: string) {
    const product = await this.repository.findById(id);
    if (!product) throw new Error('Product not found');
    return product;
  }

  async update(id: string, data: UpdateProductDTO) {
    const product = await this.repository.findById(id);
    if (!product) throw new Error('Product not found');
    return this.repository.update(id, data);
  }

  async delete(id: string) {
    const product = await this.repository.findById(id);
    if (!product) throw new Error('Product not found');
    return this.repository.delete(id);
  }
}
