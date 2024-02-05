import { Request, Response, NextFunction } from 'express';
import app from './middlewares/routerMiddlewares'

class Server {
  constructor(PORT: string) {
    this.serverErrorHandler()
    this.runServer(PORT)
  }

  private serverErrorHandler() {
    app.use((error: Error, req: Request, res: Response) => {
      console.log(error.stack);
      res.status(500).json({ msg: error.message })
    })
  }

  runServer(PORT: string) {
    app.listen(PORT, () => {
      console.log(`server running at PORT ${PORT}`);
    })
  }

}

export default Server
