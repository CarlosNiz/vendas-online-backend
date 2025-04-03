import { userEntityMock } from "../../user/__mocks__/user.mock";
import { AddressEntity } from "../entities/address.entity";
import { cityMock } from "../../city/__mocks__/city.mock";

export const addressMock: AddressEntity = {
    cep: '0910923847',
    cityId: cityMock.id,
    complement: 'asçlkdjf',
    id: 23424,
    numberAddress: 654,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: userEntityMock.id,
}