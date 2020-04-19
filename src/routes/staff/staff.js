import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'

const route = () => {

    const router = new express.Router();

    router.get('/staff', (req, res) => {
        DBconnect.query(
            `
            SELECT
            staff.id AS id,
            CONCAT(staff.first_name, " ", staff.last_name, " ", staff.patronymic) AS fullName,
            CONCAT(company.name, " ", ">", " ", department.name, " ", ">", " ", positions.name) AS fullMeta
            FROM staff
            INNER JOIN positions
            INNER JOIN department
            INNER JOIN company
            ON staff.position_id=positions.id AND positions.department_id=department.id AND department.company_id=company.id
            `, (error, result) => {
                if(error){
                    console.log('getStaff Error => ', error);
                    res.status(404).send();
                }else{
                    res.status(200).send(result);
                }
            }
        )
    })

    router.post('/staff', (req, res) => {
        DBconnect.query(
            `
            INSERT INTO staff
            (
                position_id,
                first_name,	
                last_name,	
                patronymic,	
                id_card, 
                id_FIN,	
                adress,	
                join_date,	
                private_phone,	
                private_email,	
                note
            )
            VALUES
            (
                ${req.body.position_id},
                "${req.body.first_name}",
                "${req.body.last_name}",
                "${req.body.patronymic}",
                "${req.body.id_card}",
                "${req.body.id_FIN}",
                "${req.body.adress}",
                "${req.body.join_date}",
                "${req.body.private_phone}",
                "${req.body.private_email}",
                "${req.body.note}"
            )
            `, (error, result) => {
                if(error){
                    console.log('addStaff Error => ', error);
                    res.status(500).send();
                }else{
                    res.status(201).send();
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