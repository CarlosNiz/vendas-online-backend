import { UpdatePasswordDTO } from "../dtos/update-password.dto";

export const updatePasswordMock: UpdatePasswordDTO = {
    lastPassword: 'abc',
    newPassword: 'asdlkfçj'
}

export const updatePasswordInvalidMock: UpdatePasswordDTO = {
    lastPassword: 'aslkdf',
    newPassword: 'lakjsdf'
}