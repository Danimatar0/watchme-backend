import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { AddUserRequestDTO } from 'src/PLL/dtos/auth/AddUserRequestDTO';
import { AddUserResponseDTO } from 'src/PLL/dtos/auth/AddUserResponseDTO';
import { User, UserDocument } from '../entities/user.model';
import { AuthUser } from '../models/authuser.model';
import * as bcrypt from 'bcrypt';
import { bcryptHash, generateSalt, verifyHash } from '../../utils/helpers/bcrypt.helpers';
import { LoginRequestDTO } from 'src/PLL/dtos/auth/LoginRequestDTO';
import { signJwt } from 'src/utils/helpers/jwt.helpers';

require("dotenv").config();

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly users: Model<UserDocument>) { }

    async register(userModel: AddUserRequestDTO): Promise<any> {
        if (await this.getUser({ username: userModel.username })) {
            throw new Error('User already exists');
        }

        var createdUser = new AddUserResponseDTO();
        var hashedPassword = await bcryptHash(userModel.password);
        var created = this.users.create({
            username: userModel.username,
            password: hashedPassword,
            firstname: userModel.firstname,
            lastname: userModel.lastname,
            dob: userModel.dob,
            phoneNumber: userModel.phoneNumber
        });
        return (await created)._id;
    }


    async login(userModel: LoginRequestDTO): Promise<AuthUser> {
        var existing = await this.getUser({ username: userModel.username });
        if (!existing) throw new Error('Invalid Username or Password');
        // console.log("found user "+ existing);
        try {
            console.log(`comparing ${userModel.password} with ${existing.password}`);
            var passwordValid = await verifyHash(userModel.password, existing.password);
            if (!passwordValid) throw new Error('Invalid Username or Password');
            var authUser = new AuthUser();

            //Jwt signing Payload construction
            var payload = {
                userId: existing.id,
            };

            //Jwt signing options construction
            var signOptions = {
                expiresIn: process.env.JWT_EXPIRY_DURATION,
            };

            //Signing jwt
            var token = signJwt(payload, process.env.JWT_SECRET_KEY, signOptions);

            authUser.id = existing.id;
            authUser.username = existing.username;
            authUser.firstname = existing.firstname;
            authUser.lastname = existing.lastname;
            authUser.dob = existing.dob;
            authUser.profile = existing.profile;
            authUser.token = token;

            return authUser;

        } catch (err) {
            console.log('ERROR -> ',err);
            throw new Error('Internal Server Error');
        }

    }

    async getUser(query: object): Promise<UserDocument> {
        var found = await this.users.findOne(query);
        // console.log("found "+ found);
        return found;
    }
}

