import "reflect-metadata";
import { Methods} from  "./Method"
import { MetaDataKeys} from "./MetaDatakeys"

export function routeBinder(method: string) {
  return function (path: string) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
      Reflect.defineMetadata(MetaDataKeys.path, path, target, key);
      Reflect.defineMetadata(MetaDataKeys.method, method, target, key);
    };
  };
}
export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const patch = routeBinder(Methods.patch);
export const put = routeBinder(Methods.put);
export const del = routeBinder(Methods.delete);