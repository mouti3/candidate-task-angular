import { RoleEnum } from "./role.enum";

export interface GetRolesResponseInterface {
    users: RoleInterface[]
}

export interface RoleInterface {
    id: string;
    role: RoleEnum;
}