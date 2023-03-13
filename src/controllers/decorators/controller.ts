import "reflect-metadata";
import {Request,Response,nextFunction,RequestHandler} from "express"
import { AppRouter } from "../../AppRouter";
import {Methods} from "./Methods"
import {MetaDataKeys} from "./MetaDataKeys"

function bodyValidator(keys:string):RequestHandler{
 return function(req:Request,res:Response,next:nextFunction){
  if (!req.body) {
    res.status(422).send("Invalid Request")
    return ;
  }
  for(let key in keys){
    if (!req.body[keys]) {
      res.status(422).send("Invalid Request")
    }
    return
  }
 }
 next()
}

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(MetaDataKeys.path, target.prototype, key);
      const method = Reflect.getMetadata(MetaDataKeys.method,target.prototype,key)
      const middlewares = Reflect.getMetadata(MetaDataKeys.middleware,target.prototype,key)||[]
      const requestBodyValidatorProps = Reflect.getMetadata(MetaDataKeys.validator,target.prototype,key)||[]
      const validator = bodyValidator(requestBodyValidatorProps)
      if (path) {
        router[method](`${routePrefix}${path}`,...middlewares, validator ,routeHandler);
      }
    }
  };
}
