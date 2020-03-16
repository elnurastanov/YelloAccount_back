import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import AppRoutes from './routes/index';

const port = 2000;
const app = express()


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


AppRoutes(app);


app.listen(port, () => {
    console.log(`Port number is ${port}`);
})
