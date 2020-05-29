import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'

const route = () => {

    const Router = new express.Router();

    Router
        .get('/organization/position/:id', async (req, res) => {

            try {

                const result = await DBconnect.promise().query(
                    `
                        SELECT id, name
                        FROM positions
                        WHERE department_id=${req.params.id}
                        AND position_status = true
                    `
                )

                res.status(200).send(result[0])
                
            } catch (error) {
                
                console.log('getPositionDepartmentID Error => ', error);
                res.status(500).send()

            }
        })

    return Router;
}

export default {
    route,
    routePrefix: `/${config.version}/panel`
}