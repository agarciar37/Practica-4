// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { WorkerModel } from "../db/worker.ts";
import { BusinessModel } from "../db/business.ts";

export const hireWorker = async (
    req: Request<{ workerId: string; businessId: string }>, 
    res: Response) => {
    const { workerId, businessId } = req.params;

    try {
        const worker = await WorkerModel.findById(workerId).exec();

        if (!worker) {
        res.status(404).send({ error: "Worker not found" });
        return;
        }

        const business = await BusinessModel.findById(businessId).exec();

        if (!business) {
        res.status(404).send({ error: "Business not found" });
        return;
        }

        if (business.workersID.includes(worker._id)) {
        res.status(400).send({ error: "Worker is already associated with the business" });
        return;
        }

        business.workersID.push(worker._id);
        await business.save();

        res.status(200).send("Worker hired to the business successfully");
    } catch (error) {
        res.status(500).send(error);
    }
}