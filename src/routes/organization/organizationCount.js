import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'

const route = () => {

    const router = new express.Router();

    router.get('/organization/count', (req, res) => {
        DBconnect.query(
            `
            SELECT 'company_count' tablename, COUNT(*) AS 'rows' FROM company 
            UNION 
            SELECT 'department_count' tablename, COUNT(*) AS 'rows' FROM department
            UNION
            SELECT 'position_count' tablename, COUNT(*) AS 'rows' FROM positions
            UNION
            SELECT 'staff_count' tablename, COUNT(*) AS 'rows' FROM staff
           `, (error, result) => {
            if (error) {
                console.log('getOrganizationCount Error => ', error);
                res.status(404).send()
            } else {
                let data = {
                    company_count: result[0].rows,
                    department_count: result[1].rows,
                    position_count: result[2].rows,
                    staff_count: result[3].rows
                }

                res.status(200).send(data)
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