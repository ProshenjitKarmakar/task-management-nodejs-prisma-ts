
export interface IMyTask {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    priority: TPriority;
    status: TStatus;
}

export interface IAddMyTask {
    title: string;
    description: string;
    dueDate: Date | string;
    priority: TPriority;
    status: TStatus;
}

export type TPriority = 'LOW' | 'MEDIUM' | 'HIGH';
export type TStatus = 'PENDING' | 'PROGRESS' | 'COMPLETED';


export interface IUpdateMyTask extends IAddMyTask {
    id: number;
}

export type IMyTaskId = Pick<IMyTask, 'id'>;

export interface IMyTaskPayload {
    searchContent: string;
    page?: number;
    perPage?: number;
}
