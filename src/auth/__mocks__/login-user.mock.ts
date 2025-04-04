import { userEntityMock } from "../../user/__mocks__/user.mock";
import { LonginDto } from "../dtos/login.dto";

export const loginUserMock: LonginDto = {
    email: userEntityMock.email,
    password: 'abc',
}