import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'

const route = () => {

    const router = new express.Router();

    router.route('/organization/company')
        .get((req, res) => {

            DBconnect.query(
                `SELECT id, name, direction FROM company`,
                (error, result) => {
                    if (error) {
                        console.log('getCompany Error => ', error);
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