import { ProductService } from '../services/product.service.js';
import { ProductRepository } from '../repositories/product.repository.js';

describe('ProductService', () => {
  let service: ProductService;
  let repository: ProductRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    service = new ProductService(repository);
  });

  it('should create a product', async () => {
    const dto = { name: 'Test', price: '10.00', category: 'entradas' };
    (repository.create as jest.Mock).mockResolvedValue({ id: '1', ...dto });

    const result = await service.create(dto);
    expect(result).toEqual({ id: '1', ...dto });
    expect(repository.create).toHaveBeenCalledWith(dto);
  });

  it('should list all products', async () => {
    const products = [{ id: '1', name: 'Test' }];
    (repository.findAll as jest.Mock).mockResolvedValue(products);

    const result = await service.list();
    expect(result).toEqual(products);
  });

  it('should get product by id', async () => {
    const product = { id: '1', name: 'Test' };
    (repository.findById as jest.Mock).mockResolvedValue(product);

    const result = await service.getById('1');
    expect(result).toEqual(product);
  });

  it('should throw if product not found', async () => {
    (repository.findById as jest.Mock).mockResolvedValue(null);

    await expect(service.getById('1')).rejects.toThrow('Product not found');
  });

  it('should update a product', async () => {
    const dto = { name: 'Updated' };
    (repository.findById as jest.Mock).mockResolvedValue({ id: '1', name: 'Test' });
    (repository.update as jest.Mock).mockResolvedValue({ id: '1', ...dto });

    const result = await service.update('1', dto);
    expect(result).toEqual({ id: '1', ...dto });
  });

  it('should delete a product', async () => {
    (repository.findById as jest.Mock).mockResolvedValue({ id: '1', name: 'Test' });
    (repository.delete as jest.Mock).mockResolvedValue(undefined);

    await expect(service.delete('1')).resolves.toBeUndefined();
  });
});
