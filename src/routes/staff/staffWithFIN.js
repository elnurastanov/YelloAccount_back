import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'

const route = () => {

    const router = new express.Router();

    router.get('/staff/:id', (req, res) => {
        DBconnect.query(
            `
            SELECT
            id,
            first_name,
            last_name,
            patronymic
            FROM staff
            WHERE id_FIN="${req.params.id}"
            AND status=true
            `, (error, result) => {
            if (error) {
                console.log('getStaffWithFIN Error => ', error);
                res.status(404).send();
            } else {
                const data= {
                    id: result[0].id,
                    first_name: result[0].first_name,
                    last_name: result[0].last_name,
                    patronymic: result[0].patronymic
                }
                res.status(200).send(data);
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