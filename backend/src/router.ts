import express from "express";
import jwtAuth from "./middlewares/jwtAuth";
import promiseErrorHandler from "./utils/promiseErrorHandler";
import UserController from "./controllers/UserController";


const {
  loginHandler, 
  signinHandler, 
  deleteHandler, 
  updateHandler
} = UserController


class RouterManager {
    private manageRouter = express.Router()

    constructor(){
      this.manageRouter
        .post('/user/login', promiseErrorHandler(loginHandler))
        .post('/user/signin', promiseErrorHandler(signinHandler))
        .put('/user/update', jwtAuth, promiseErrorHandler(updateHandler))
        .delete('/user/delete', jwtAuth, promiseErrorHandler(deleteHandler))
    }
    
    get router(){
      return this.manageRouter
    }
}

const router = new RouterManager().router
export default router