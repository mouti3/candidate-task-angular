import { UserInterface } from "./user.interface";

export interface GetUsersResponseInterface {
    users: UserInterface[],
    total: number,
    skip: number,
    limit: number
}