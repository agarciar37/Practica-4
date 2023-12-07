// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { TaskModel } from "../db/task.ts";

export const deleteTask = async (
    req : Request<{id : string}, {}>,
    res : Response<string | {error : unknown}>
) => {
    const id = req.params.id
    try {
        const task = await TaskModel.findByIdAndDelete(id).exec()

        if (!task) {
            res.status(404).send({ error: "Task not found" })
            return
        }

        res.status(200).send("Task deleted")
    } catch (error) {
        res.status(500).send(error)
    }
}