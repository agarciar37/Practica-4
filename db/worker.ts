import mongoose from "mongoose"
import { Worker } from "../types.ts"

const Schema = mongoose.Schema

const workerSchema = new Schema(
    {
        name : {type : String, required : true},
        dni : {type : String, required : true, unique : true},
        email : {type : String, required : true, unique : true},
        tasksID : [{type : mongoose.Types.ObjectId, required : true, ref : "Task"}],
        businessID : {type : mongoose.Types.ObjectId, required : true, ref : "Business"}
    },
    {timestamps : true}
)

//validate tasks
workerSchema.path("tasksID").validate(async function(tasksID : mongoose.Types.ObjectId[]){
    const maxTasks = 10
    return tasksID.length <= maxTasks
}, "A worker can not have more than 10 tasks")

//valiate business
workerSchema.path("businessID").validate(async function (businessID) {
    try {
        const count = await WorkerModel.countDocuments({ businessID });
        return count === 0; 
    } catch (error) {
        return false;
    }
}, "A worker can only belong to one business");

export type WorkerModelType = mongoose.Document & Omit<Worker, "id" | "business"> & {
    tasksID : Array<mongoose.Types.ObjectId>
    businessID : mongoose.Types.ObjectId
}
  
export const WorkerModel = mongoose.model<WorkerModelType>("Worker", workerSchema);