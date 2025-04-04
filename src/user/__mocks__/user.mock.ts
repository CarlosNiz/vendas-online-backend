import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/user-type.enum";

export const userEntityMock: UserEntity = {
    cpf: '123543543',
    createdAt: new Date(),
    email: 'emailmock@gmail.com',
    id: 43242,
    name : 'nameMock',
    password: '$2b$10$YId3oaB4JFcEsAgH6rxf9eBGHdeRKHPP3OupJA0mRma3P33rYz9A2',
    phone: '17293874',
    typeUser: UserType.User,
    updatedAt: new Date(),
    addresses: []
}