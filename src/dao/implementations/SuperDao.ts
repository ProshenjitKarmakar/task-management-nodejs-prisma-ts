import { Prisma, PrismaClient } from "@prisma/client";
import ISuperDao from "../contracts/ISuperDao";
import { PrismaModels } from "../../@types/prismaModels.ts";

export class SuperDao<T extends keyof PrismaModels> implements ISuperDao {
    private prisma: PrismaClient;
    private model: PrismaModels[T];

    constructor(modelName: T) {
        this.prisma = new PrismaClient();
        this.model = this.prisma[modelName];
    }


    // Method to find all records
    findAll = async () => {
        try {
            // Type casting to resolve union type issue
            const data = await (this.model as any).findMany();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    findAllWithPaginationAndDates = async (skip: number, take: number, fromDate: string, toDate: string) => {
        try {

            const dateFilter = fromDate && toDate ? {
                dueDate: {
                    gte: new Date(fromDate), // Greater than or equal to fromDate
                    lte: new Date(toDate),   // Less than or equal to toDate
                }
            } : {}
            // Use the skip and take for pagination
            const data = await (this.model as any).findMany({
                skip,
                take,
                where: {
                    ...dateFilter,
                },
                orderBy: {
                    dueDate: 'desc', // Assuming you're ordering by dueDate
                },
            });
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    // Method to create a new record
    create = async (data: any) => {
        try {
            const result = await (this.model as any).create({
                data: { ...data }
            });
            return result;
        } catch (error) {
            console.error('Error creating record:', error);
            throw error;
        }
    }

    // Method to find records based on conditions
    findAllByWhere = async (
        where: Prisma.UserWhereInput, // Adjust this type based on your model
        attributes: Prisma.UserSelect | null = null, // Adjust this type based on your model
        order: Prisma.UserOrderByWithRelationInput[] = [{ id: 'desc' }] // Adjust this type based on your model
    ) => {
        try {
            const data = await (this.model as any).findMany({
                where: where,
                select: attributes || undefined,
                orderBy: order
            });
            return data;
        } catch (error) {
            console.error('Error fetching data by where:', error);
            throw error;
        }
    };

    count = async () => {
        try {
            return await (this.model as any).count();
        } catch (error) {
            console.error('Error counting data:', error);
            throw error;
        }
    }

    findOneByWhere = async (
        where: Prisma.UserWhereInput,
        attributes: Prisma.UserSelect | null = null,
        order: Prisma.UserOrderByWithRelationInput[] = [{ id: 'desc' }]
    ) => {
        try {
            const data = await await (this.model as any).findFirst({
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


    // Other methods remain the same with (this.model as any) casting
    findById = async (id: number) => {
        try {
            const data = await (this.model as any).findUnique({
                where: { id }
            });
            return data;
        } catch (error) {
            console.error('Error fetching data by ID:', error);
            throw error;
        }
    }

    // Method to update records based on 'where' conditions
    updateWhere = async (
        data: Prisma.UserUpdateInput,
        where: Prisma.UserWhereUniqueInput
    ) => {
        try {
            const updatedRecord = await (this.model as any).update({
                where: where,
                data: data
            });
            return updatedRecord;
        } catch (error) {
            console.error('Error updating record:', error);
            throw error;
        }
    };

    updateById = async (data: Prisma.UserUpdateInput, id: number) => {
        try {
            const updatedRecord = await (this.model as any).update({
                where: { id },
                data: data
            });
            return updatedRecord;
        } catch (error) {
            console.error('Error updating record by ID:', error);
            throw error;
        }
    }

    deleteByWhere = async (where: Prisma.UserWhereUniqueInput) => {
        try {
            const deletedRecord = await (this.model as any).delete({
                where: where
            });
            return deletedRecord;
        } catch (error) {
            console.error('Error deleting record:', error);
            throw error;
        }
    }
}
