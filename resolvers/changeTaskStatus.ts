// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { TaskModel } from "../db/task.ts";
import { TaskStatus } from "../types.ts";

export const updateTaskStatus = async (req: Request<{ id: string }, {}, { status: TaskStatus }>, res: Response) => {
    const id = req.params.id
    const { status } = req.body

    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(id,{ status },{ new: true, runValidators: true })

        if (!updatedTask) {
        res.status(404).send({ error: "Task not found" })
        return
        }

        res.status(200).json(updatedTask).send()
    } catch (error) {
        res.status(500).send(error)
    }
};