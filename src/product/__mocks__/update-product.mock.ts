import { categoryMock } from '../../category/__mocks__/category.mock';
import { UpdateProductDTO } from '../dtos/update-product.dto';
 
 export const updateProductMock: UpdateProductDTO = {
   categoryId: categoryMock.id,
   image: 'asdfadsf',
   name: 'asdfasffff',
   price: 43.0
 };