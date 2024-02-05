import express from "express";

const promiseErrorHandler = <T extends Function> (fn: T) => 
(req: express.Request, res: express.Response, next: express.NextFunction) => {

    Promise.resolve(fn(req, res, next)).catch(next)
}

export default promiseErrorHandler