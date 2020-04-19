import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'

const route = () => {

    const router = new express.Router();

    router.get('/organization/department/:id', (req, res) => {
        DBconnect.query(
            `
            SELECT id, name
            FROM department
            WHERE company_id=${req.params.id}
            `,
            (error, result) => {
                if (error) {
                    console.log('getDepartmentWithCompanyID Error => ', error);
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