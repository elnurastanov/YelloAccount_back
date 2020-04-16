import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'

const route = () => {

    const router = new express.Router();

   router.get('/organization/department', (req, res) => {
       DBconnect.query(
           `SELECT 
           department.id,
           company.name AS company_name, 
           department.name AS department_name 
           FROM department
           INNER JOIN company 
           WHERE department.company_id=company.id`,
           (error, result) => {
               if(error){
                   console.log('getDepartment Error => ', error);
                   res.status(404).send()
               }else{
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