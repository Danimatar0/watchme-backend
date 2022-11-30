import { AuthUser } from "src/DAL/models/authuser.model";
import { GlobalResponseDTO } from "../global/globalresponse.dto";

export class LoginResponseDTO extends GlobalResponseDTO {
    body: AuthUser;
}