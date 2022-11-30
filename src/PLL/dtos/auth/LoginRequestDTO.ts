import { Prop } from "@nestjs/mongoose";

export class LoginRequestDTO {

    @Prop({required: true})
    username: string;

    @Prop({required: true})
    password: string;
}