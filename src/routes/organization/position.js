import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'

const route = () => {
    const Router = new express.Router();

    Router
        .get('/organization/position', async (req, res) => {

            try {

                const result = await DBconnect.promise().query(
                    `
                        SELECT 
                        CONCAT(company.name,' ','>',' ',department.name) AS fullMeta, 
                        department.name AS department_name, 
                        positions.id AS id, 
                        positions.name AS position_name
                        FROM positions
                        INNER JOIN department
                        INNER JOIN company
                        WHERE positions.department_id=department.id AND department.company_id=company.id
                        AND position_status = true
                    `
                )

                res.status(200).send(result[0])

            } catch (error) {

                console.log('getPosition Error => ', error);
                res.status(500).send()

            }
        })

    return Router;
}

export default {
    route,
    routePrefix: `/${config.version}/panel`
}