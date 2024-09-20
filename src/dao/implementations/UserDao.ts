import { Request } from "express";
import { PrismaClient } from "@prisma/client";
import { IUserDao } from "../contracts/IUserDao";

export class UserDao implements IUserDao {
    private prisma;
    constructor() {
        this.prisma = new PrismaClient();
    }

    create = async (data: { name: string, email: string }) => {
        const { name, email } = data;
        return await this.prisma.user.create({
            data: {
                name,
                email,
                image_url: '',
                password: ''
            },
        });
    }

    list = async () => {
        return await this.prisma.user.findMany();
    }

    update = async (where: any, data: { name: string, email: string }) => {
        const { name, email } = data
        return this.prisma.user.update({
            where: { ...where },
            data: { name, email }
        });
    }

    delete = async (where: any) => {
        return await this.prisma.user.delete({
            where: { ...where }
        })

    }
}