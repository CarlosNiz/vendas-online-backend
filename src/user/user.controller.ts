import { Body, Controller, Get, NotFoundException, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { ReturnUserDto } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
        return this.userService.createUser(createUser);
    }

    @Get()
    async getAllUser(): Promise<ReturnUserDto[]> {
        return (await this.userService.getAllUser()).map(
            (userEntity) => new ReturnUserDto(userEntity)
        );
    }

    @Get('/:userId')
    async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
        const user = await this.userService.getUserByIdUsingRelations(userId);
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        return new ReturnUserDto(user);
    }
}
