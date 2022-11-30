import { ObjectId } from 'mongoose';
import { v4 as uuid } from 'uuid';

export class AuthUser{
    id : ObjectId;
    username: string;
    firstname: string;
    lastname: string;
    dob: string;
    profile: string;
    token: string;
}