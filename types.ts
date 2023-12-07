export type Business = {
    id : string,
    name : string,
    workers : Array<Omit<Worker, "business">>
}

export type Worker = {
    id : string,
    name : string,
    dni : string,
    email : string,
    tasks : Array<Omit<Task, "worker" | "business">>
    business : Omit<Business, "workers">
}

export type Task = {
    id : string,
    description : string,
    status : TaskStatus,
    worker : Omit<Worker, "tasks" | "business">,
    business : Omit<Business, "workers">
}

export enum TaskStatus {
    TODO = "TO DO",
    inProgress = "In Progress",
    inTest = "In Test",
    Closed = "Closed"
}