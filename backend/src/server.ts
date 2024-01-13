import { NextFunction, Request, Response } from "express";
import app from "./app";

const PORT = process.env.PORT || 3000

app.use((error: Error, req: Request, res: Response, next: NextFunction)=>{
    console.log(error.stack);
    res.status(500).json({msg: error.message})
})

app.listen(PORT, ()=>{
    console.log(`server loading at PORT ${PORT}`);
})
