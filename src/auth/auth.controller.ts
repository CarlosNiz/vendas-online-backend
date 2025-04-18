import { Body, Controller, Injectable, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LonginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { ReturnLogin } from './dtos/returnLogin.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @UsePipes(ValidationPipe)
    @Post()
    async login(@Body() loginDto: LonginDto): Promise<ReturnLogin> {
        return this.authService.login(loginDto);
    }
}
