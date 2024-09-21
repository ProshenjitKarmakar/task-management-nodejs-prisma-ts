import { Prisma } from "@prisma/client";

export default interface ISuperDao {
    findAll: () => Promise<any>;
    count: () => Promise<any>;
    findAllWithPagination: (skip: number, take: number) => Promise<any>;
    findAllByWhere: (
        where: Prisma.UserWhereInput,
        attributes: Prisma.UserSelect | null,
        order: Prisma.UserOrderByWithRelationInput[]
    ) => Promise<any>;
    findById: (id: number) => Promise<any>;
    findOneByWhere: (
        where: Prisma.UserWhereInput,
        attributes: Prisma.UserSelect | null,
        order: Prisma.UserOrderByWithRelationInput[]
    ) => Promise<any>;
    updateWhere: (data: Prisma.UserUpdateInput, where: Prisma.UserWhereUniqueInput) => Promise<any>;
    updateById: (data: Prisma.UserUpdateInput, id: number) => Promise<any>;
    create: (data: object) => Promise<any>;
    // findByWhere: (
    //     where: object,
    //     attributes: string[] | undefined,
    //     order: string[],
    //     limit: number | null,
    //     offset: number | null
    // ) => Promise<any>;
    deleteByWhere: (where: Prisma.UserWhereUniqueInput) => Promise<any>;
    // bulkCreate: (data: object[]) => Promise<any>;
    // getCountByWhere: (where: object) => Promise<any>;
    // incrementCountInFieldByWhere: (
    //     fieldName: string,
    //     where: object,
    //     incrementValue: number
    // ) => Promise<any>;
    // decrementCountInFieldByWhere: (
    //     fieldName: string,
    //     where: object,
    //     decrementValue: number
    // ) => Promise<any>;
}
