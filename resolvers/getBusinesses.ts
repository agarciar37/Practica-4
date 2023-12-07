// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Business } from "../types.ts";
import { BusinessModel } from "../db/business.ts";
import { getBusinessFromModel } from "../controllers/getBusinessFromModel.ts";

export const getBusinesses = async (
    req : Request,
    res : Response<Business[] | {error : unknown}>
) => {
    try{
        const businesses = await BusinessModel.find({}).exec()

        const businessesResponse : Business[] = await Promise.all(
            businesses.map((business) => getBusinessFromModel(business))
        )

        res.status(200).json(businessesResponse).send()
    }catch (error){
        res.status(500).send(error)
    }
}