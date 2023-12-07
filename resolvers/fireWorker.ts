// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { WorkerModel } from "../db/worker.ts";

export const fireWorker = async(
    req : Request<{id : string}>,
    res : Response
) => {
    const id = req.params.id

    try{
        const worker = await WorkerModel.findById(id).exec()
        if (!worker){
            res.status(404).send({error: "Worker not found"})
            return
        }

        await worker.deleteOne({_id:id})
        res.status(200).send("Worker fired successfully")
    }catch (error){
        res.status(500).send(error)
    }
}