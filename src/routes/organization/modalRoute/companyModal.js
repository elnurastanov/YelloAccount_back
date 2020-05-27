import express from 'express'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import config from '../../../config'
import DBconnect from '../../../database/dbconnection'

const route = () => {

    const Router = new express.Router();

    Router
        .get('/organization/company/modal/:id', async (req, res) => {

            try {

                const result = await DBconnect.promise().query(
                    `
                        SELECT name, direction
                        FROM company
                        where id= ${req.params.id}
                        AND status = true
                    `
                )

                if (result.length === 0) res.status(404).send()
                if (result.length !== 0) res.status(200).send(result[0])

            } catch (error) {

                console.log('getCompanyByID Error => ', error);
                res.status(500).send()

            }
        })

        .post('/organization/company/modal', async (req, res) => {

            const token = req.headers.authorization

            try {

                const userdata = await jwt.verify(token, config.key)

                await DBconnect.promise().query(
                    `
                        INSERT INTO company
                        (reg_user, name, direction)
                        VALUES
                        (
                            "${userdata.id}",
                            "${req.body.name}", 
                            "${req.body.direction}"
                        )
                    `
                );

                res.status(201).send()

            } catch (error) {

                console.log('addCompany Error => ', error);
                res.status(500).send()

            }
        })

        .put('/organization/company/modal/:id', async (req, res) => {

            const token = req.headers.authorization

            try {

                const userdata = await jwt.verify(token, config.key)

                await DBconnect.promise().query(
                    `
                        UPDATE company
                        SET name = "${req.body.name}",
                        direction = "${req.body.direction}",
                        update_user = "${userdata.id}",
                        update_date = "${moment().format()}"
                        WHERE id = ${ req.params.id}
                        AND status = true
                    `
                )

                res.status(200).send()

            } catch (error) {

                console.log('editCompany Error => ', error);
                res.status(500).send()

            }
        })

        .delete('/organization/company/:id', async (req, res) => {

            const token = req.headers.authorization

            try {

                const userdata = await jwt.verify(token, config.key)

                DBconnect.promise().query(
                    `
                        UPDATE company
                        SET delete_user = "${userdata.id}",
                        delete_date = "${moment().format()}",
                        status = false
                        WHERE id = ${req.params.id}
                        AND status = true
                    `
                )

                res.status(200).send()

            } catch (error) {

                console.log('deleteCompany Error => ', error);
                res.status(500).send()

            }
        })


    return Router;
}

export default {
    route,
    routePrefix: `/${config.version}/panel`
}