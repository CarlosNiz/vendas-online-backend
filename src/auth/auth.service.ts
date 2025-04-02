import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { LonginDto } from './dtos/login.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { ReturnUserDto } from '../user/dtos/returnUser.dto';
import { LoginPayload } from './dtos/loginPayload.dto';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService, private jwtService: JwtService) {}

    async login(loginDto: LonginDto): Promise<ReturnLogin> {
        const user: UserEntity | undefined = await this.userService.findUserByEmail(loginDto.email).catch(() => undefined);
        const isMatch = await compare(loginDto.password, user?.password || '');

        if(!user || !isMatch) {
            throw new NotFoundException('Email or Password invalid');
        }

        return {
            accessToken: await this.jwtService.signAsync({ ...new LoginPayload(user) }),
            user: new ReturnUserDto(user)
        };
    }
}
