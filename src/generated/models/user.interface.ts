import { RoleEnum } from "./role.enum";

export interface UserInterface {
    id: number,
    username: string;
    email: string;
    role: RoleEnum;
    birthDate: string;
}
