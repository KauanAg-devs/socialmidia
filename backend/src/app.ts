import connectDb from './db/connectdb'
import Server from './server'

class App {
  constructor() {
    this.init()
  }

  async init() {
    await this.database()
    this.server()
  }

  async database() {
    await connectDb() //connectDb from ./db/connectdb.ts
  }

  server() {
    const PORT = process.env.PORT || '3000'
    new Server(PORT) //Server from ./server.ts
  }
}

new App()