import { BusinessModel } from "../db/business.ts";
import { TaskModelType } from "../db/task.ts";
import { WorkerModel } from "../db/worker.ts";
import { Task } from "../types.ts";

export const getTaskFromModel = async (task : TaskModelType): Promise<Task> => {

    const {_id, description, status, workerID, businessID} = task

    try {
        const [worker, business] = await Promise.all([
            WorkerModel.findById(workerID),
            BusinessModel.findById(businessID),
        ])

        if (!worker || !business) {
            throw new Error("Worker or Business not found")
        }

        return {
            id: _id.toString(),
            description,
            status,
            worker: {
                id: worker._id.toString(),
                name: worker.name,
                dni: worker.dni,
                email: worker.email,
            },
            business: {
                id: business._id.toString(),
                name: business.name,
            }
        }
    } catch (error) {
        throw new Error("Error getting data")
    }
}