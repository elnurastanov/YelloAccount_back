import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'

const route = () => {

    const router = new express.Router();

    router.get('/organization/position/:id', (req, res) => {
        DBconnect.query(
            `
            SELECT id, name
            FROM positions
            WHERE department_id=${req.params.id}
            `,
            (error, result) => {
                if (error) {
                    console.log('getPositionDepartmentID Error => ', error);
                    res.status(404).send()
                } else {
                    res.status(200).send(result)
                }
            }
        )
    })

    return router;
}

export default {
    route,
    routePrefix: `/${config.version}/panel`
}