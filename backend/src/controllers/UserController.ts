//libraries
    import express from "express";
import jwt from 'jsonwebtoken'

//components
import { userModel } from "../schemas/User";

const jwtSecretKey = process.env.JWTSECRETKEY as string

class UserController {
   constructor(){}

   public async signinHandler(req: express.Request, res: express.Response){
    const {name, password, email} = req.body  
    const doesUserExists = await userModel.findOne({name, password, email})

    if(!name || !email || !password) {
        return res.status(403).json({msg: `credentials required`})
    }
    if (doesUserExists) {
        return res.status(401).json({msg: `this user exists`})        
    }

    const createdUser = await userModel.create({name, password, email})
    const token = jwt.sign({_id: createdUser.id}, jwtSecretKey) 
    res.status(201).json({msg: token})
   }

   public async loginHandler(req: express.Request, res: express.Response){
   const {name, password, email} = req.body

   const user = await userModel.findOne({$or: [{name, email}], password })
   const token = jwt.sign({_id: user?._id}, jwtSecretKey)
   res.status(200).json({msg: token})
   }

   public deleteHandler(req: express.Request, res: express.Response){
    const {name, password, email} = req.body
   }

   public updateHandler(req: express.Request, res: express.Response){
    const {name, password, email} = req.body
   }
}

export default new UserController()