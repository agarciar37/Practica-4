// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { BusinessModel } from "../db/business.ts";
import { WorkerModel } from "../db/worker.ts";

export const deleteBusiness = async (
    req : Request<{id : string}, {}>,
    res : Response<string | {error : unknown}>
) => {
    const id = req.params.id
    try {
        await WorkerModel.deleteMany({ businessID: id })
        
        const business = await BusinessModel.findByIdAndDelete(id).exec()

        if (!business) {
            res.status(404).send({ error: "Business not found" })
            return
        }

        res.status(200).send("Business deleted")
    } catch (error) {
        res.status(500).send(error)
    }
}