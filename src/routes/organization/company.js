import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'

const route = () => {

    const router = new express.Router();

    router.route('/organization/company/:id')
        .get((req, res) => {
            if (req.params.id === '11') {
                DBconnect.query(
                    `SELECT name, direction FROM company`,
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send(result)
                        }
                    }
                )
            } else {
                res.send('sehf ID')
            }
        })
        .post((req, res) => {
            if (req.params.id === '12') {
                DBconnect.query(
                    `INSERT INTO company
                        (name, direction)
                        VALUES
                        (
                            "${req.body.companyName}", 
                            "${req.body.companyDirection}"
                        )`,
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send('OK')
                        }
                    }
                )
            } else {
                res.send('sehf ID')
            }
        })

    return router;
}

export default {
    route,
    routePrefix: `/${config.version}/panel`
}