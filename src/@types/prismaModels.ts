import { PrismaClient } from '@prisma/client';

export type PrismaModels = {
    user: PrismaClient['user'];
    // Add other models here as needed
};
