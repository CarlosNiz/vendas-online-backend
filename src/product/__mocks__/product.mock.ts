import { categoryMock } from "../../category/__mocks__/category.mock";
import { ProductEntity } from "../entities/product.entity";

export const productMock: ProductEntity = {
    categoryId: categoryMock.id,
    createdAt: new Date('2023-01-01T00:00:00.000Z'),
    id: 7435,
    image: 'http://image.com',
    name: 'name product mock',
    price: 34.3,
    updatedAt: new Date('2023-01-01T00:00:00.000Z')
}