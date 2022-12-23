import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import morgan from 'morgan'
import colors from 'colors'
import { notFound,errorHandler } from './middleware/errorMiddleware.js' 
import morgan from 'morgan'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json()) 

app.get('/',(req,res) =>{
    res.send('API is running...')
})

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/upload',uploadRoutes)

const __dirname = path.resolve()
app.use('/upload', express.static(path.join(__dirname, '/upload')))

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5001

app.listen(PORT,console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))