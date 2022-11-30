import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UsersService } from '../../DAL/services/users.service';
import * as bcrypt from 'bcrypt';
import { AddUserRequestDTO } from '../dtos/auth/AddUserRequestDTO';
import { GlobalResponseDTO } from '../dtos/global/globalresponse.dto';
import { LoginResponseDTO } from '../dtos/auth/LoginResponseDTO';
import { LoginRequestDTO } from '../dtos/auth/LoginRequestDTO';

@Controller('auth')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('/signup')
    async register(
        @Body('password') password: string,
        @Body('confirmPassword') confirmPassword: string,
        @Body('username') username: string,
        @Body('firstname') firstname: string,
        @Body('lastname') lastname: string,
        @Body('dob') dob: string,
        @Body('phoneNumber') phoneNumber: string
    ): Promise<GlobalResponseDTO> {
        const dto = new AddUserRequestDTO();
        var resp = new GlobalResponseDTO();
        dto.username = username;
        dto.firstname = firstname;
        dto.lastname = lastname;
        dto.dob = dob;
        dto.phoneNumber = phoneNumber;
        dto.password = password;
        dto.confirmPassword = confirmPassword;
        try {
            const newUserId = await this.usersService.register(dto);
            resp.statusCode = 201;
            resp.message = "User created successfully";
            resp.body = newUserId;
        } catch (error) {
            resp.statusCode = 400;
            resp.message = error.message;
            return resp;
        }
        return resp;
    }

    @Post('/login')
    async login(
        @Body('username') username: string,
        @Body('password') password: string): Promise<LoginResponseDTO> {

        const dto = new LoginRequestDTO();
        dto.username = username;
        dto.password = password;
        const resp = new LoginResponseDTO();
        try {
            const user = await this.usersService.login(dto);
            resp.statusCode = 200;
            resp.message = "Login successful";
            resp.body = user;
            return resp;
        } catch (error) {
            resp.statusCode = 400;
            resp.message = error.message;
            return resp;
        }
    }
}