import express from 'express'
import config from '../../../config'
import DBconnect from '../../../database/dbconnection'
import moment from 'moment'

const route = () => {

    const Router = new express.Router();

    Router
        .get('/staff/modal/:id', async (req, res) => {

            try {

                const result = await DBconnect.promise().query(
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
                `
                )

                const data = result[0]

                let staffData = {
                    company_id: data[0].company_id,
                    department_id: data[0].department_id,
                    position_id: data[0].position_id,
                    first_name: data[0].first_name,
                    last_name: data[0].last_name,
                    patronymic: data[0].patronymic,
                    id_card: data[0].id_card,
                    id_FIN: data[0].id_FIN,
                    adress: data[0].adress,
                    join_date: moment(data[0].join_date).format('DD-MM-YYYY'),
                    experience: `${moment().diff(moment(data[0].join_date), 'years')} il ${moment().diff(moment(result[0].join_date), 'months') % 12} ay ${moment().diff(moment(result[0].join_date), 'days') - (moment().diff(moment(result[0].join_date), 'months') * 30)} gün`,
                    private_phone: data[0].private_phone,
                    private_email: data[0].private_email,
                    note: data[0].note
                }

                res.status(200).send(staffData);

            } catch (error) {

                console.log('getStaff Error => ', error);
                res.status(500).send();

            }
        })

        .post('/staff', async (req, res) => {

            try {

                await DBconnect.promise().query(
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
                `
                )

                res.status(201).send();

            } catch (error) {

                console.log('addStaff Error => ', error);
                res.status(500).send();

            }
        })

    return Router;

}

export default {
    route,
    routePrefix: `/${config.version}/panel`
}