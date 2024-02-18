import CustomError from '../utils/CustomError.js'
import mongoose from 'mongoose'

export const errorHandler = (err, req, res, next) => {
    console.log(err)
    
    if (err instanceof mongoose.Error)
        return res.status(400).json({ msg: 'Bad request' })

    if (err instanceof CustomError) 
        return res.status(err.statusCode).json({ msg: err.message })

    res.status(500).json({ msg: 'Internal server error.' })
}
