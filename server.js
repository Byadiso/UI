// eslint-disable-next-line prettier/prettier

//import dependencie

import express from 'express'
import router from './routes/routes'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

//set up dependencies

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json())

app.use(router)

// set up mongoose
mongoose
    .connect('mongodb://localhost/properties')
    .then(() => {
        console.log('Database connected')
    })
    .catch(() => {
        console.log('Error connecting to database')
    })

// set up route
app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message:
            'Welcome to PropertyPro-Lite you can search properties for sale or rent!',
    })
})

app.use('*', (req, res) => {
    res.status(400).json({
        status: 400,
        message: "Sorry this router doesn't exist !",
    })
})

const port = process.env.PORT || 3000

app.listen(port, () =>
    console.log('Welcome to MY Property Pro Lite Land Server!!....')
)

export default app
