import { ProductCategories } from '../utils/usecases/product-categories.enum.js';

export interface CreateProductDTO {
  name: string;
  price: string;
  category: ProductCategories; 
  is_visible?: boolean;
  display_order?: number;
}

export interface UpdateProductDTO {
  name?: string;
  price?: string;
  category?: ProductCategories;
  display_order?: number;
}
