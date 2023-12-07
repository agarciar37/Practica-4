// @deno-types="npm:@types/express@4"
import { Request, Response, request } from "express";
import { Worker } from "../types.ts";
import { WorkerModel } from "../db/worker.ts";
import { getWorkerFromModel } from "../controllers/getWorkerFromModel.ts";

export const getWorker = async (
    req : Request<{id : string}>,
    res : Response<Worker | {error : unknown}>
) => {
    const id = req.params.id
    try{
        const worker = await WorkerModel.findById(id).exec()
        if (!worker){
            res.status(404).send({error: "Worker not found"})
            return
        }
        const workerResponse: Worker = await getWorkerFromModel(worker)
        res.status(200).json(workerResponse).send()
    }catch (error){
        res.status(500).send(error)
    }
}