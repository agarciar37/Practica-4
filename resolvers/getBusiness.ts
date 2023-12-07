// @deno-types="npm:@types/express@4"
import { Request, Response, request } from "express";
import { Business } from "../types.ts";
import { BusinessModel } from "../db/business.ts";
import { getBusinessFromModel } from "../controllers/getBusinessFromModel.ts";

export const getBusiness = async (
    req : Request<{id : string}>,
    res : Response<Business | {error : unknown}>
) => {
    const id = req.params.id
    try{
        const business = await BusinessModel.findById(id).exec()
        if (!business){
            res.status(404).send({error:"Business not found"})
            return
        }
        const businessResponse: Business = await getBusinessFromModel(business)
        res.status(200).json(businessResponse).send()
    }catch (error){
        res.status(500).send(error)
    }
}