// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { WorkerModel, WorkerModelType } from "../db/worker.ts";
import { getWorkerFromModel } from "../controllers/getWorkerFromModel.ts";
import { Worker } from "../types.ts";

export const createWorker = async (
    req : Request<{}, {}, WorkerModelType>,
    res : Response<Worker | {error : unknown}>
) => {
    try{
        const {name, dni, email, tasksID, businessID} = req.body
        const worker = new WorkerModel({
            name,
            dni,
            email,
            tasksID,
            businessID
        })

        await worker.save()
        const workerResponse : Worker = await getWorkerFromModel(worker)
        res.status(201).json(workerResponse).send()
    }catch (error){
        res.status(500).send(error)
    }
}