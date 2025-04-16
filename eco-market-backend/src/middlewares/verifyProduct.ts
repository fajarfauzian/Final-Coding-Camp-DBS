// import { Category } from "@prisma/client";
import { NextFunction, Request,Response} from "express";
import Joi, { valid } from "joi";

const addDataSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().valid('FOOD','DRINK','ITEMS').required(),
    description: Joi.string().required(),
    picture: Joi.allow().optional()
})

const updateDataSchema = Joi.object({
    name: Joi.string().optional(),
    price: Joi.number().min(0).optional(),
    category: Joi.string().valid('FOOD','DRINK','ITEMS').optional(),
    description: Joi.string().optional(),
    picture: Joi.allow().optional()
})

export const verifyAddProduct = (request: Request, response: Response, next: NextFunction) => {
    const {error} = addDataSchema.validate(request.body,{abortEarly: false})
    
    if (error) {
        
        return response.status(200).json({
            status: false,
            message: error.details.map(it => it.message).join()
        })
    }
    return next()
}

export const verifyUpdateProduct = (request: Request, response: Response, next: NextFunction) => {
    const {error} = updateDataSchema.validate(request.body,{abortEarly: false})
    
    if (error) {
        
        return response.status(200).json({
            status: false,
            message: error.details.map(it => it.message).join()
        })
    }
    return next()
}

