import express from 'express'
import config from '../../../config'
import DBconnect from '../../../database/dbconnection'

const route = () => {

    const router = new express.Router();

    router.get(`/organization/department/modal/:id`, (req, res) => {
        DBconnect.query(
            `
            SELECT 
            company.id AS company_id, 
            department.name AS department_name 
            FROM department
            INNER JOIN company 
            WHERE department.company_id=company.id 
            AND department.id = ${req.params.id}
            `, (error, result) => {
            if (error) {
                console.log('getDepartmentById Error => ', error);
                res.status(404).send()
            } else {
                res.status(200).send(result)
            }
        }
        )
    })

    router.post('/organization/department/modal', (req, res) => {
        DBconnect.query(
            `
            INSERT INTO department
            (company_id, name)
            VALUES 
            (${req.body.id}, "${req.body.name}")
            `, (error, result) => {
            if (error) {
                console.log('addDepartment Error => ', error);
                res.status(404).send()
            } else {
                res.status(201).send()
            }
        })
    })

    router.put('/organization/department/modal/:id', (req, res) => {
        DBconnect.query(
            `
            UPDATE department
            SET 
            company_id=${req.body.company_id},
            name="${req.body.name}"
            WHERE 
            id=${req.params.id}
            `, (error, result) => {
            if (error) {
                console.log('editDepartment Error => ', error);
                res.status(404).send()
            } else {
                res.status(200).send()
            }
        }
        )
    })

    router.delete('/organization/department/:id', (req, res) => {
        DBconnect.query(
            `
            DELETE FROM department 
            WHERE id=${req.params.id}
            `, (error, result) => {
            if (error) {
                console.log('deleteDepartment Error => ', error);
                res.status(404).send()
            } else {
                res.status(200).send()
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