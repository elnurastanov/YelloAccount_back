import express from 'express'
import config from '../../../config'
import DBconnect from '../../../database/dbconnection'
import moment from 'moment'

const route = () => {

    const router = new express.Router();

    router
    .get('/staff/modal/:id', (req, res) => {
        DBconnect.query(
            `
            SELECT
            company.id AS company_id,
            department.id AS department_id,
            positions.id AS position_id,
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
            FROM staff
            INNER JOIN positions
            INNER JOIN department
            INNER join company
            ON staff.id=${req.params.id} 
            AND staff.position_id=positions.id 
            AND positions.department_id=department.id 
            AND department.company_id=company.id
            AND staff.status=true
            `, (error, result) => {
            if (error) {
                console.log('getStaff Error => ', error);
                res.status(404).send();
            } else {
                let staffData = {
                    company_id: result[0].company_id,
                    department_id: result[0].department_id,
                    position_id: result[0].position_id,
                    first_name: result[0].first_name,
                    last_name: result[0].last_name,
                    patronymic: result[0].patronymic,
                    id_card: result[0].id_card,
                    id_FIN: result[0].id_FIN,
                    adress: result[0].adress,
                    join_date: moment(result[0].join_date).format('DD-MM-YYYY'),
                    experience: `${moment().diff(moment(result[0].join_date), 'years')} il ${moment().diff(moment(result[0].join_date), 'months')%12} ay ${moment().diff(moment(result[0].join_date), 'days') - (moment().diff(moment(result[0].join_date), 'months')*30)} gün`, 
                    private_phone: result[0].private_phone,
                    private_email: result[0].private_email,
                    note: result[0].note
                }
                res.status(200).send(staffData);
            }
        }
        )
    })

    .post('/staff', (req, res) => {
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
                note,
                status
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
                "${req.body.note}",
                true
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