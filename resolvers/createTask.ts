// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { TaskModel, TaskModelType } from "../db/task.ts";
import { Task } from "../types.ts";
import { getTaskFromModel } from "../controllers/getTaskFromModel.ts";

export const createTask = async (
    req : Request<{}, {}, TaskModelType>,
    res : Response<Task | {error : unknown}>
) => {
    try{
        const {description, status, workerID, businessID} = req.body
        const task = new TaskModel({
            description,
            status,
            workerID,
            businessID
        })

        await task.save()
        const taskResponse : Task = await getTaskFromModel(task)
        res.status(201).json(taskResponse).send()
    }catch (error){
        res.status(500).send(error)
    }
}