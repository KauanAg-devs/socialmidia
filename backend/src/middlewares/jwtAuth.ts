import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'


interface AuthRequest extends Request {
    user?: any
}

function jwtAuth(req: AuthRequest, res: Response, next: NextFunction,) {
    const token = req.header('Authorization')
    if(!token) return res.status(401).json({msg: `token not provided`});

    jwt.verify(token, process.env.JWTSECRETKEY as string, (error, user)=>{
     if(error) return res.status(403).json({msg: `token not allowed`})
     req.user = user
    next()
    })    
}

export default jwtAuth