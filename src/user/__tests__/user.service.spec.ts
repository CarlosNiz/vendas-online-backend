import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userEntityMock } from '../__mocks__/user.mock';
import { createUserMock } from '../__mocks__/createUser.mock';
import { updatePasswordInvalidMock, updatePasswordMock } from '../__mocks__/update-user.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user in findUserByEmail', async () => {
    const user = await service.findUserByEmail(userEntityMock.email);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error in findUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
    
    expect(service.findUserByEmail(userEntityMock.email),
    ).rejects.toThrow();
  });

  it('should return error in findUserByEmail {erro DB}', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());
    
    expect(service.findUserByEmail(userEntityMock.email),
    ).rejects.toThrow();
  });

  it('should return user in findUserById', async () => {
    const user = await service.findUserById(userEntityMock.id);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error in findUserById', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
    
    expect(service.findUserById(userEntityMock.id),
    ).rejects.toThrow();
  });

  it('should return error in findUserById {erro DB}', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());
    
    expect(service.findUserById(userEntityMock.id),
    ).rejects.toThrow();
  });

  it('should return user in getUserByIdUsingRelations', async () => {
    const user = await service.getUserByIdUsingRelations(userEntityMock.id);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error if use exist', async () => {
    expect(service.createUser(createUserMock)).rejects.toThrow();
  });
  
  it('should return user if use not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

    const user = await service.createUser(createUserMock);

    expect(user).toEqual(userEntityMock);
  });

  it('should return user in update password', async () => {
    const user = await service.updatePasswordUser(updatePasswordMock, userEntityMock.id);

    expect(user).toEqual(userEntityMock);
  });

  it('should return invalid password in error', async () => {
    expect(service.updatePasswordUser(updatePasswordInvalidMock, userEntityMock.id)).rejects.toThrow();
  });

  it('should return error in user not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

    expect(service.updatePasswordUser(updatePasswordInvalidMock, userEntityMock.id)).rejects.toThrow();
  });
});
