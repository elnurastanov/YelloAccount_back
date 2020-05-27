import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'

const route = () => {

    const Router = new express.Router();

    Router
        .get('/organization/company', async (req, res) => {

            try {

                const result = await DBconnect.promise().query(
                    `
                        SELECT id, name, direction 
                        FROM company
                        WHERE status = true
                    `
                )

                res.status(200).send(result[0])
                
            } catch (error) {
                
                console.log('getCompany Error => ', error);
                res.status(500).send()

            }

        })

    return Router;
}

export default {
    route,
    routePrefix: `/${config.version}/panel`
}