import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'

const route = () => {
    const router = new express.Router();

    router.route('/organization/position/:id')
        .get((req, res) => {
            if (req.params.id === '30') {
                DBconnect.query(
                    `SELECT id, name 
                    FROM company`,
                    (error, result) => {
                        if(error){
                            console.log(error);
                        }else{
                            res.send(result);
                        }
                    }
                        
                )
            }
        })
        .post((req, res) => {
            if(req.params.id === '31'){
                DBconnect.query(
                    `SELECT department.id as id, department.name as name
                    FROM department
                    INNER JOIN company
                    ON department.company_id = company.id
                    WHERE department.company_id = ${req.body.companyID}`,
                    (error, result) => {
                        if(error){
                            console.log(error)
                        }else{
                            res.send(result);
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