import { Prisma, PrismaClient } from "@prisma/client";
import ISuperDao from "../contracts/ISuperDao";
import { PrismaModels } from "./../../@types/prismaModels.ts";

export class SuperDao<T extends keyof PrismaModels> implements ISuperDao {
    private prisma: PrismaClient;
    private model: PrismaModels[T];

    constructor(modelName: T) {
        this.prisma = new PrismaClient();
        this.model = this.prisma[modelName];
    }

    findAll = async () => {
        try {
            const user = await this.model.findMany();
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    create = async (data: any) => {
        try {
            const user = await this.model.create({
                data: { ...data }
            });
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    findAllByWhere = async (
        where: Prisma.UserWhereInput, // Adjust this type based on your model
        attributes: Prisma.UserSelect | null = null, // Adjust this type based on your model
        order: Prisma.UserOrderByWithRelationInput[] = [{ id: 'desc' }] // Adjust this type based on your model
    ) => {
        try {
            const data = await this.model.findMany({
                where: where,
                select: attributes || undefined,
                orderBy: order
            });
            return data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    };

    findById = async (id: number) => {
        try {
            const data = await this.model.findUnique({
                where: { id }
            });
            return data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    findOneByWhere = async (
        where: Prisma.UserWhereInput,
        attributes: Prisma.UserSelect | null = null,
        order: Prisma.UserOrderByWithRelationInput[] = [{ id: 'desc' }]
    ) => {
        try {
            const data = await this.model.findFirst({
                where: { ...where },
                include: { ...attributes },
                orderBy: order
            });
            return data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    updateWhere = async (
        data: Prisma.UserUpdateInput,
        where: Prisma.UserWhereUniqueInput
    ) => {
        try {
            const user = await this.model.update({
                where: where,
                data: data
            });
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    };

    updateById = async (
        data: Prisma.UserUpdateInput,
        id: number
    ) => {
        try {
            const user = await this.model.update({
                where: { id },
                data: data
            });
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    deleteByWhere = async (
        where: Prisma.UserWhereUniqueInput
    ) => {
        try {
            const user = await this.model.delete({
                where: where
            });
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
}
