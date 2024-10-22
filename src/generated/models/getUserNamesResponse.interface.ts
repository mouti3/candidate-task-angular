export interface GetUserNamesResponseInterface {
    users: UserNameInterface[]
}

export interface UserNameInterface {
    id: string;
    username: string;
}