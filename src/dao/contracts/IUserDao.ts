export interface IUserDao {
    create: (data: { name: string, email: string }) => Promise<{ name: string, email: string }>
    list: () => Promise<{ id: number, name: string, email: string }[]>
    update: (where: any, data: { name: string, email: string }) => Promise<any>
    delete: (where: any) => Promise<{ id: number }>
}