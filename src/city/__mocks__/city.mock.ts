import { stateMock } from "../../state/__mocks__/state.mock";
import { CityEntity } from "../entities/city.entity";

export const cityMock: CityEntity = {
    createdAt: new Date(),
    id: 12341234,
    name: 'cityName',
    stateId: stateMock.id,
    updatedAt: new Date()
}