export interface IRegistrationPayload {
    id?: number
    name: string,
    email: string
    password: string
}

export interface IGenerateTokenPayload {
    id: number,
    name: string;
    email: string;
    accessToken?: string;
}