import { ZodError, ZodIssue } from "zod";

export const errorMessageFormatter = (err: unknown): { [key: string]: string }[] | undefined => {
    if (err instanceof ZodError) {
        let message: { [key: string]: string }[] = [];
        err.errors.map((e: ZodIssue) => {
            // Create an object with the key as e.path[0] and value as e.message
            message.push({ [e.path[0]]: e.message });
        });
        return message;
    }
    return undefined;
};