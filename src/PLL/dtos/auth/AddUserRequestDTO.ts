import { Prop } from "@nestjs/mongoose";

export class AddUserRequestDTO {

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({
        required: true, validate: function (v: string) {
            return v === this.password;
        }
    })
    confirmPassword: string;

    @Prop({ required: true, unique: true })
    firstname: string;

    @Prop({ required: true, unique: true })
    lastname: string;

    @Prop({ required: true, unique: true })
    dob: string;

    @Prop({ required: true, unique: true })
    phoneNumber: string;
}