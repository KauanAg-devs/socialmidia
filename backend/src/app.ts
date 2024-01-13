//libraries
import express, {Request, Response} from 'express'
import cors from 'cors'
//components
import connectDb from './db/connectdb'
import router from './router'


class App {
    public app: express.Application

    constructor(){
        this.app = express()

        this.database()
        this.middlewares()
        this.router()

    }

    private async database(){
     await connectDb() //connectDb from ./db/connectdb file'
    }

    private middlewares(){
      this.app.use(express.json())
      this.app.use(cors())
      this.app.use(express.urlencoded({extended: false}))
    }

    private router(){
      this.app.use(router) //router from ./router file
    }
}

export default new App().app