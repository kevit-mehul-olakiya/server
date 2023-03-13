"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.routeBinder = void 0;
require("reflect-metadata");
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata("path", path, target, key);
            Reflect.defineMetadata("method", method, target, key);
        };
    };
}
exports.routeBinder = routeBinder;
exports.get = routeBinder("get");
