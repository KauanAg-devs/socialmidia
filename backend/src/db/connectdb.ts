import mongoose from 'mongoose'

async function connectDb(){
    
    const databaseUri = process.env.DATABASEURI as string    
    
     await mongoose.connect(databaseUri) 
      .catch((error: Error)=>{
        console.log(error.stack)
        process.exit()
      })
      .then(()=>{
        console.log('connected to database');
      })      
}

export default connectDb