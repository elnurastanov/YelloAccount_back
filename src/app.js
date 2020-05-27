import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import AppRoutes from './routes/index';
import config from './config'
import Authenticated from './routes/middleware/authenticated'
import Authorization from './routes/middleware/authorization'
const port = config.port
const app = express()


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(`/${config.version}/panel/organization`, Authenticated)
app.use(`/${config.version}/panel/staff`, Authenticated)
app.use(`/${config.version}/panel/users`, Authenticated)
app.use(`/${config.version}/panel/organization`, Authenticated)

app.use(`/${config.version}/panel/:panel`, Authorization)


AppRoutes(app);


app.listen(port, () => {
    console.log(`Port number is ${port}`);
})
