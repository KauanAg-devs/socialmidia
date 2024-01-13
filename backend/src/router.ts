import express from "express";
import jwtAuth from "./middlewares/jwtAuth";
import UserController from "./controllers/UserController";



class RouterManager {
    private manageRouter = express.Router()

    private promiseHandler = <T extends Function> (fn: T) => 
      (req: express.Request, res: express.Response, next: express.NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next)
    }

    constructor(){
        this.manageRouter
        .post('/user/login', this.promiseHandler(UserController.loginHandler))
        .post('/user/signin', this.promiseHandler(UserController.signinHandler))
        .put('/user/update', jwtAuth, this.promiseHandler(UserController.updateHandler))
        .delete('/user/delete', jwtAuth, this.promiseHandler(UserController.deleteHandler))
    }
    
    get router(){
      return this.manageRouter
    }
}

export default new RouterManager().router