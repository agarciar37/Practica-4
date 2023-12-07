import mongoose from "mongoose"
import { Task } from "../types.ts"
import { WorkerModel } from "./worker.ts";
import { BusinessModel } from "./business.ts";

const Schema = mongoose.Schema

const taskSchema = new Schema(
    {
        description : {type : String, required : true},
        status : {
            type : String,
            enum: ["TO DO", "In Progress", "In Test", "Closed"],
            default : "TO DO"
        },
        workerID : {type : Schema.Types.ObjectId, required : true, ref : "Worker"},
        businessID : {type : Schema.Types.ObjectId, required : true, ref : "Business"},
    },
    {timestamps : true}
)

//validate workerID
taskSchema
    .path("workerID")
    .validate(async function (workerID : mongoose.Types.ObjectId) {
        try{
            if (!mongoose.isValidObjectId(workerID)) return false
            const worker = await WorkerModel.findById(workerID)
            if (!worker) return false
            return true
        }catch (e){
            return false
        }
    })

//validate businessID
taskSchema
    .path("businessID")
    .validate(async function (businessID : mongoose.Types.ObjectId){
        try{
            if (!mongoose.isValidObjectId(businessID)) return false
            const business = await BusinessModel.findById(businessID)
            if (!business) return false
            return true
        }catch (e){
            return false
        }
    })

    taskSchema.pre("remove", async function (next) {
        const taskId = this._id;
    
        // Remove the task from associated worker
        await WorkerModel.updateMany({ tasksID: taskId }, { $pull: { tasksID: taskId } });
    
        next();
    });

export type TaskModelType = mongoose.Document & Omit<Task, "worker" | "business"> & {
    workerID : mongoose.Types.ObjectId
    businessID: mongoose.Types.ObjectId
};
      
export const TaskModel = mongoose.model<TaskModelType>("Task", taskSchema);