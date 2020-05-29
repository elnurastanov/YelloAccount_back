import express from 'express'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import config from '../../../config'
import DBconnect from '../../../database/dbconnection'

const route = () => {
    const Router = new express.Router()

    Router
        .get('/organization/position/modal/:id', async (req, res) => {

            try {

                const result = await DBconnect.promise().query(
                    `
                        SELECT department_id, name
                        FROM positions
                        WHERE id=${req.params.id}
                        AND position_status = true
                    `
                )

                res.status(200).send(result[0])

            } catch (error) {

                console.log('getPositionsById Error => ', error);
                res.status(500), send()

            }
        })

        .post('/organization/position/modal', async (req, res) => {

            const token = req.headers.authorization

            try {

                const userdata = await jwt.verify(token, config.key)

                await DBconnect.promise().query(
                    `
                        INSERT INTO positions
                        (reg_user, department_id, name)
                        VALUES
                        (${userdata.id} ,${req.body.id}, "${req.body.name}")
                    `
                )

                res.status(201).send()

            } catch (error) {

                console.log('addPosition Error => ', error);
                res.status(500).send()

            }
        })

        .put('/organization/position/modal/:id', async (req, res) => {

            const token = req.headers.authorization

            try {

                const userdata = await jwt.verify(token, config.key)

                await DBconnect.promise().query(
                    `
                        UPDATE positions
                        SET
                        department_id = ${req.body.department_id},
                        name = "${req.body.name}",
                        update_user = ${userdata.id},
                        update_date = "${moment().format()}"
                        WHERE id = ${req.params.id}
                        AND position_status = true
                    `
                )

                res.status(200).send()

            } catch (error) {

                console.log('editPosition Error => ', error);
                res.status(500).send()

            }
        })

        .delete('/organization/position/:id', async (req, res) => {

            const token = req.headers.authorization

            try {

                const userdata = await jwt.verify(token, config.key)

                await DBconnect.promise().query(
                    `
                        UPDATE positions
                        SET 
                        position_status = false,
                        delete_user = ${userdata.id},
                        delete_date = "${moment().format()}"
                        WHERE id = ${req.params.id}
                        AND position_status = true
                    `
                )

                res.status(200).send()

            } catch (error) {

                console.log('deletePosition Error => ', error);
                res.status(500).send()

            }
        })

    return Router;
}

export default {
    route,
    routePrefix: `/${config.version}/panel`
}