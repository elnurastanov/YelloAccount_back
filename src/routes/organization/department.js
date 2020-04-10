import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'

const route = () => {

    const router = new express.Router();

    router.route('/organization/department/:id')
        .get((req, res) => {
            if (req.params.id === '21') {
                DBconnect.query(
                    `SELECT company.name as company_name, department.name as department_name
                     FROM company 
                     INNER JOIN department
                     ON department.company_id = company.id`,
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send(result);
                            console.log(result)
                        }
                    }
                )
            } else if(req.params.id === '20'){
                DBconnect.query(
                    `SELECT id, name
                     FROM company`,
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send(result)
                        }
                    }
                )
            } else {
                res.send('sehf ID');
            }
        })
        .post((req, res) => {
            if (req.params.id === '22') {
                DBconnect.query(
                    `INSERT INTO department 
                    (company_id, name) 
                    VALUES 
                    (${req.body.companyID}, "${req.body.departmentName}")`,
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send('OK');
                            console.log(result)
                        }
                    }
                )
            }
        })

    return router;
}

export default {
    route,
    routePrefix: `/${config.version}/panel`
}