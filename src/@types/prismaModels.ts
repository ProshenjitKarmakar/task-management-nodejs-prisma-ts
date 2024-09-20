import { PrismaClient } from '@prisma/client';

export type PrismaModels = {
    user: PrismaClient['user'];
    task: PrismaClient['task'];
    // Add other models here as needed
};
