import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function dbConnect() {
  try {
    await mongoose.connect(config.database_url as string)
    // console.log('Db Connected 💾')

    app.listen(config.port, () => {
      // console.log(`Server is running on port ${config.port} 🚀`)
    })
  } catch (error) {
    // console.log('Failed to connect', error)
  }
}

dbConnect()
