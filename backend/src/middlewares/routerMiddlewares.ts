import express from 'express'
import cors from 'cors'
import router from '../router'


class routerMiddlewares {
    private express = express()

    constructor(){
        this.middlewares()
        this.express.use(router)
    }

    middlewares(){
        this.express.use(cors())
        this.express.use(express.json())
        this.express.use(express.urlencoded({extended: true}))
    }
    
    get app(){
        return this.express
    }
}

const app = new routerMiddlewares().app
export default app