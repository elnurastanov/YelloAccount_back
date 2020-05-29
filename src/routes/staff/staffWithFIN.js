import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'

const route = () => {

    const Router = new express.Router();

    Router
        .get('/register/:id', async (req, res) => {

            try {

                const result = await DBconnect.promise().query(
                    `
                    SELECT
                    id,
                    first_name,
                    last_name,
                    patronymic
                    FROM staff
                    WHERE id_FIN="${req.params.id}"
                    AND status=true
                `
                )

                const staffdata = result[0]

                const data = {
                    id: staffdata[0].id,
                    first_name: staffdata[0].first_name,
                    last_name: staffdata[0].last_name,
                    patronymic: staffdata[0].patronymic
                }

                res.status(200).send(data);

            } catch (error) {

                console.log('getStaffWithFIN Error => ', error);
                res.status(500).send();

            }
        })

    return Router;

}

export default {
    route,
    routePrefix: `/${config.version}`
}