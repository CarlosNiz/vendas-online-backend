import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/user-type.enum";

export const userEntityMock: UserEntity = {
    cpf: '123543543',
    createdAt: new Date(),
    email: 'emailmock@gmail.com',
    id: 43242,
    name : 'nameMock',
    password: 'largePassword',
    phone: '17293874',
    typeUser: UserType.User,
    updatedAt: new Date(),
    addresses: []
}