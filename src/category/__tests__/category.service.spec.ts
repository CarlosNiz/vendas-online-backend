import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { categoryMock } from '../__mocks__/category.mock';
import { createCategoryMock } from '../__mocks__/create-category.mock';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, {
        provide: getRepositoryToken(CategoryEntity),
        useValue: {
          findOne: jest.fn().mockResolvedValue(categoryMock),
          find: jest.fn().mockResolvedValue([categoryMock]),
          save: jest.fn().mockResolvedValue(categoryMock)

        }
      }],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<CategoryEntity>>(getRepositoryToken(CategoryEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });

  it('should return list category', async () => {
    const categories = await service.findAllCategories();

    expect(categories).toEqual([categoryMock]);
  });

  it('should return error in list category empty', async () => {
    jest.spyOn(categoryRepository, 'find').mockResolvedValue([]);

    await expect(service.findAllCategories()).rejects.toThrow();
  });

  it('should return error in list category exception', async () => {
    jest.spyOn(categoryRepository, 'find').mockRejectedValue(new Error());

    await expect(service.findAllCategories()).rejects.toThrow();
  });

  it('should return error if exist category name', async () => {
    expect(service.createCategory(createCategoryMock)).rejects.toThrow();
  });

  it('should return category after save', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(null);

    const category = await service.createCategory(createCategoryMock);

    expect(category).toEqual(categoryMock);
  });

  it('should return error in exception', async () => { 
    jest.spyOn(categoryRepository, 'save').mockRejectedValue(new Error());

    expect(service.createCategory(createCategoryMock)).rejects.toThrow();
  });

  it('should return category find by name', async () => {
    const category = await service.findCategoryByName(categoryMock.name);

    expect(category).toEqual(categoryMock);
  });

  it('should return error if category find by name empty', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(null);

    expect(service.findCategoryByName(categoryMock.name)).rejects.toThrow();
  });

  it('should return category in find by id', async () => {
    const category = await service.findCategoryById(categoryMock.id);

    expect(category).toEqual(categoryMock);
  });

  it('should return error not found category id', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(null);

    expect(service.findCategoryById(categoryMock.id)).rejects.toThrow();
  });
});
