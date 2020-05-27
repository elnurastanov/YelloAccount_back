import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'
import messages from '../messages'

const route = () => {

    const router = new express.Router();

    router.get('/organization/department', async (req, res) => {

        try {

            const result = await DBconnect.promise().query(
                `
                    SELECT 
                    department.id,
                    company.name AS company_name, 
                    department.name AS department_name 
                    FROM department
                    INNER JOIN company 
                    WHERE department.company_id=company.id
                    AND department_status = true
               `
            )

            res.status(200).send(result[0])

        } catch (error) {

            console.log('getDepartment Error => ', error);
            res.status(500).json()

        }

    })

    return router;
}

export default {
    route,
    routePrefix: `/${config.version}/panel`
}