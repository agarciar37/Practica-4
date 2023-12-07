// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { BusinessModel, BusinessModelType } from "../db/business.ts";
import { Business } from "../types.ts";
import { getBusinessFromModel } from "../controllers/getBusinessFromModel.ts";

export const createBusiness = async (
    req : Request<{}, {}, BusinessModelType>,
    res : Response<Business | {error : unknown}>
) => {
    try{
        const {name, workersID} = req.body
        const business = new BusinessModel({
            name,
            workersID
        })

        await business.save()
        const businessResponse : Business = await getBusinessFromModel(business)
        res.status(201).json(businessResponse).send()
    }catch (error){
        res.status(500).send(error)
    }
}