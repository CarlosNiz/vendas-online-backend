import { UserEntity } from "../../user/entities/user.entity";

export class LoginPayload {
    constructor(user: UserEntity) {
        this.id = user.id;
        this.typeUser = user.typeUser;
    }

    id: number;
    typeUser: number;
}