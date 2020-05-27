import express from 'express'
import moment from 'moment'
import jwt from 'jsonwebtoken'
import config from '../../../config'
import DBconnect from '../../../database/dbconnection'

const route = () => {

    const Router = new express.Router();

    Router
        .get(`/organization/department/modal/:id`, async (req, res) => {

            try {

                const result = await DBconnect.promise().query(
                    `
                    SELECT 
                    company.id AS company_id, 
                    department.name AS department_name 
                    FROM department
                    INNER JOIN company 
                    WHERE department.company_id=company.id 
                    AND department.id = ${req.params.id}
                    AND department_status = true
                `
                )

                res.status(200).send(result[0])

            } catch (error) {

                console.log('getDepartmentById Error => ', error);
                res.status(500).send()

            }
        })

        .post('/organization/department/modal', async (req, res) => {

            const token = req.headers.authorization

            try {

                const userdata = await jwt.verify(token, config.key)
                await DBconnect.promise().query(
                    `
                        INSERT INTO department
                        (
                            reg_user,
                            company_id,
                            name
                        )
                        VALUES 
                        (
                            ${userdata.id},
                            ${req.body.id},
                            "${req.body.name}"
                        )
                    `
                )

                res.status(201).send()

            } catch (error) {

                console.log('addDepartment Error => ', error);
                res.status(500).send()

            }
        })

        .put('/organization/department/modal/:id', async (req, res) => {

            const token = req.headers.authorization

            try {

                const userdata = await jwt.verify(token, config.key)
                await DBconnect.promise().query(
                    `
                        UPDATE department
                        SET 
                        update_user = ${userdata.id},
                        update_date = "${moment().format()}",
                        company_id=${req.body.company_id},
                        name="${req.body.name}"
                        WHERE id=${req.params.id}
                        AND department_status = true
                    `
                )
                
                res.status(200).send()

            } catch (error) {

                console.log('editDepartment Error => ', error);
                res.status(500).send()
                
            }
        })

        .delete('/organization/department/:id', async (req, res) => {

            const token = req.headers.authorization

            try {

                const userdata = await jwt.verify(token, config.key)
                await DBconnect.promise().query(
                    `
                        UPDATE department
                        SET 
                        delete_user = ${userdata.id},
                        delete_date = "${moment().format()}",
                        department_status = false
                        WHERE id=${req.params.id}
                        AND department_status = true
                    `
                )
                
                res.status(200).send()

            } catch (error) {

                console.log('deleteDepartment Error => ', error);
                res.status(500).send()
                
            }
        })

    return Router;
}

export default {
    route,
    routePrefix: `/${config.version}/panel`
}