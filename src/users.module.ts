import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose"
import { User, UserSchema } from "./DAL/entities/user.model"
import { UsersService } from './DAL/services/users.service';
import { UsersController } from './PLL/controllers/users.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UserModule {}