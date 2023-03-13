import "reflect-metadata";
import {RequestHandler} from "express"
import {MetaDataKeys} from "./MetaDataKeys"

export function use(middleware:RequestHandler){
    return function(target:AnalyserNode, key:string, desc: PropertyDescriptor){
     const middlewares = Reflect.getMetaData(MetaDataKeys.middleware,target,key) || []
     middlewares.push(middleware)
     Reflect.defineMetaData(MetaDataKeys.middleware ,[...middlewares,middleware],target,key)
    }
}