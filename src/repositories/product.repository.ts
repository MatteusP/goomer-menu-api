import sequelize from '../lib/database.js';


export type ProductRow = {
id: string;
name: string;
price: string;
category: string;
is_visible: boolean;
display_order: number;
created_at: string;
updated_at: string;
};


export class ProductRepository {
table = 'products';


async create(payload: { name: string; price: string; category: string; is_visible?: boolean; display_order?: number }) {
const sql = `INSERT INTO ${this.table} (id, name, price, category, is_visible, display_order, created_at, updated_at)
VALUES (uuid_generate_v4(), :name, :price, :category, :is_visible, :display_order, NOW(), NOW()) RETURNING *`;


const [results] = await sequelize.query(sql, {
replacements: { ...payload, is_visible: payload.is_visible ?? true, display_order: payload.display_order ?? 0 },
});


return (results as ProductRow[])?.[0] ?? null;
}


async findAll(onlyVisible = true) {
const where = onlyVisible ? 'WHERE is_visible = true' : '';
const sql = `SELECT * FROM ${this.table} ${where} ORDER BY display_order ASC, created_at DESC`;
const [results] = await sequelize.query(sql);
return results as ProductRow[];
}


async findById(id: string) {
const sql = `SELECT * FROM ${this.table} WHERE id = :id LIMIT 1`;
const [results] = await sequelize.query(sql, { replacements: { id } });
return (results as ProductRow[])?.[0] ?? null;
}


async update(id: string, payload: Partial<{ name: string; price: string; category: string; is_visible: boolean; display_order: number }>) {
const fields: string[] = [];
const replacements: any = { id };
if (payload.name !== undefined) { fields.push('name = :name'); replacements.name = payload.name; }
if (payload.price !== undefined) { fields.push('price = :price'); replacements.price = payload.price; }
if (payload.category !== undefined) { fields.push('category = :category'); replacements.category = payload.category; }
if (payload.is_visible !== undefined) { fields.push('is_visible = :is_visible'); replacements.is_visible = payload.is_visible; }
if (payload.display_order !== undefined) { fields.push('display_order = :display_order'); replacements.display_order = payload.display_order; }


if (fields.length === 0) return this.findById(id);


const sql = `UPDATE ${this.table} SET ${fields.join(', ')}, updated_at = NOW() WHERE id = :id RETURNING *`;
const [results] = await sequelize.query(sql, { replacements });
return (results as ProductRow[])?.[0] ?? null;
}


async delete(id: string) {
const sql = `DELETE FROM ${this.table} WHERE id = :id RETURNING *`;
const [results] = await sequelize.query(sql, { replacements: { id } });
return (results as ProductRow[])?.[0] ?? null;
}
}


export default ProductRepository;