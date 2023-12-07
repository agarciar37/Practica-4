// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { WorkerModel } from "../db/worker.ts";
import { TaskModel } from "../db/task.ts";

export const deleteWorker = async (
    req : Request<{id : string}, {}>,
    res : Response<string | {error: unknown}>
) => {
    const id = req.params.id
    try {
        await TaskModel.updateMany({ workerID: id }, { $pull: { workerID: id } })

        const worker = await WorkerModel.findByIdAndDelete(id).exec()

        if (!worker) {
            res.status(404).send({ error: "Worker not found" })
            return
        }

        res.status(200).send("Worker deleted")
    } catch (error) {
        res.status(500).send(error)
    }
}