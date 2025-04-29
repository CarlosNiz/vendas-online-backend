import { Body, Controller, Get, NotFoundException, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UpdatePasswordDTO } from './dtos/update-password.dto';
import { UserId } from '../decorators/user-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from './enum/user-type.enum';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
        return this.userService.createUser(createUser);
    }

    @Roles(UserType.Admin)
    @Get()
    async getAllUser(): Promise<ReturnUserDto[]> {
        return (await this.userService.getAllUser()).map(
            (userEntity) => new ReturnUserDto(userEntity)
        );
    }

    @Roles(UserType.Admin)
    @Get('/:userId')
    async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
        const user = await this.userService.getUserByIdUsingRelations(userId);
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        return new ReturnUserDto(user);
    }

    @Roles(UserType.Admin, UserType.User)
    @Patch()
    @UsePipes(ValidationPipe)
    async updatePasswordUser(@UserId() userId: number, @Body() updatePasswordDTO: UpdatePasswordDTO): Promise<UserEntity> {
        return this.userService.updatePasswordUser(updatePasswordDTO, userId);
    }
}
