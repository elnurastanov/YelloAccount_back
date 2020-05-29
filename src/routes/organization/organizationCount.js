import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'

const route = () => {

    const Router = new express.Router();

    Router
        .get('/organization/count', async (req, res) => {

            try {

                const result = await DBconnect.promise().query(
                    `
                        SELECT 'company_count' tablename, COUNT(*) AS 'rows' FROM company WHERE status = true
                        UNION 
                        SELECT 'department_count' tablename, COUNT(*) AS 'rows' FROM department WHERE department_status = true
                        UNION
                        SELECT 'position_count' tablename, COUNT(*) AS 'rows' FROM positions WHERE position_status = true
                        UNION
                        SELECT 'staff_count' tablename, COUNT(*) AS 'rows' FROM staff WHERE status = true
                    `
                )       

                const count = result[0]
                let data = {
                    company_count: count[0].rows,
                    department_count: count[1].rows,
                    position_count: count[2].rows,
                    staff_count: count[3].rows
                }

                res.status(200).send(data)

            } catch (error) {

                console.log('getOrganizationCount Error => ', error);
                res.status(500).send()
            }
        })

    return Router;
}

export default {
    route,
    routePrefix: `/${config.version}/panel`
}