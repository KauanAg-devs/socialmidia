import mongoose from 'mongoose'

async function connectDb() {
    const databaseUri = process.env.DATABASEURI as string    
    await mongoose.connect(databaseUri)
}

export default connectDb