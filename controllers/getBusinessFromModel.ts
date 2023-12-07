import { Business } from "../types.ts";
import { BusinessModelType } from "../db/business.ts";
import { WorkerModel } from "../db/worker.ts";

export const getBusinessFromModel = async (business : BusinessModelType): Promise<Business> => {
    const {_id, name, workersID} = business

    const workers = await WorkerModel.find({_id : {$in : workersID}}).populate("tasks")

    return {
        id : _id.toString(),
        name,
        workers : workers.map((worker) => (
            {
                id : worker._id.toString(),
                name : worker.name,
                dni : worker.dni,
                email : worker.email,
                tasks : worker.tasks,
            }
        ))
    }
}