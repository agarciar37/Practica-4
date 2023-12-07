// @deno-types="npm:@types/express@4"
import { Request, Response, request } from "express";
import { Task } from "../types.ts";
import { TaskModel } from "../db/task.ts";
import { getTaskFromModel } from "../controllers/getTaskFromModel.ts";

export const getTask = async(
    req : Request<{id : string}>,
    res : Response<Task | {error : unknown}>
) => {
    const id = req.params.id
    try{
        const task = await TaskModel.findById(id).exec()
        if (!task){
            res.status(404).send({error:"Task not found"})
            return
        }
        const taskResponse : Task = await getTaskFromModel(task)
        res.status(200).json(taskResponse).send()
    }catch (error){
        res.status(500).send(error)
    }
}