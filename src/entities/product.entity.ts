
import { ProductCategories } from '../utils/usecases/product-categories.enum.js';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/database.js';
import { v4 as uuidv4 } from 'uuid';


export class Product extends Model {
    declare id: string;
    declare name: string;
    declare price: string;
    declare category: ProductCategories;
    declare is_visible: boolean;
    declare display_order: number;
    declare created_at: Date;
    declare updated_at: Date;
}


Product.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    category: {
        type: DataTypes.ENUM(...Object.values(ProductCategories)),
        allowNull: false
    },
    is_visible: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    display_order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, {
    sequelize,
    tableName: 'products',
    timestamps: false,
    underscored: true,
});


export default Product;
