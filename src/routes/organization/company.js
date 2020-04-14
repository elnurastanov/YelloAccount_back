import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'

const route = () => {

    const router = new express.Router();

    router.route('/organization/company')
        .get((req, res) => {

            DBconnect.query(
                `SELECT id, name, direction FROM company`,
                (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(result)
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