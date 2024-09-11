import express from 'express'
import initAPP from './src/app.router.js'
import * as dotenv from 'dotenv'
dotenv.config()
const app = express()
const port = 3000

initAPP(app,express)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))