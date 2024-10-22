export interface GetEmailsResponseInterface {
    users: EmailInterface[]
}

export interface EmailInterface {
    id: string;
    email: string;
}