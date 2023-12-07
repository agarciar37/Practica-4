import mongoose from "mongoose"
import { Business } from "../types.ts"

const Schema = mongoose.Schema

const businessSchema = new Schema(
    {
        name : {type : String, required : true},
        workersID : [{type : mongoose.Types.ObjectId, required : true, ref : "Workers"}]
    },
    {timestamps : true}
)

//validación de middleware
businessSchema.path("workersID").validate(async function(workersID : mongoose.Types.ObjectId[]){
    const maxWorkers = 10
    return workersID.length <= maxWorkers
}, "A business can not have more than 10 workers")

export type BusinessModelType = mongoose.Document & Omit<Business, "id"| "workers"> & {
    workersID : Array<mongoose.Types.ObjectId>
}
  
export const BusinessModel = mongoose.model<BusinessModelType>("Business", businessSchema);