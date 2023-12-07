import { BusinessModel } from "../db/business.ts";
import { TaskModel } from "../db/task.ts";
import { WorkerModelType } from "../db/worker.ts";
import { Worker } from "../types.ts";

export const getWorkerFromModel = async (worker : WorkerModelType): Promise<Worker> => {
    const {_id, name, dni, email, tasksID, businessID} = worker

    try {
        const [tasks, business] = await Promise.all([
            TaskModel.find({ _id: { $in: tasksID } }).populate("worker"),
            BusinessModel.findById(businessID),
        ]);

        if (!business) {
            throw new Error("Business not found");
        }

        const tasksData = tasks.map((task) => ({
            id: task._id.toString(),
            description: task.description,
            status: task.status,
        }));

        return {
            id: _id.toString(),
            name,
            dni,
            email,
            tasks: tasksData,
            business: {
                id: business._id.toString(),
                name: business.name,
            },
        };
    } catch (error) {
        throw new Error("Error getting data");
    }
}