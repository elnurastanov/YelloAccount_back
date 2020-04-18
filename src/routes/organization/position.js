import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'

const route = () => {
    const router = new express.Router();

    router.get('/organization/position', (req, res) => {
        DBconnect.query(
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
            `, (error, result) => {
            if (error) {
                console.log('getPosition Error => ', error);
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