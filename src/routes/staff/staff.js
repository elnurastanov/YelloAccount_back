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
            ON 
            staff.position_id=positions.id 
            AND positions.department_id=department.id 
            AND department.company_id=company.id
            AND staff.status=true
            `, (error, result) => {
            if (error) {
                console.log('getStaff Error => ', error);
                res.status(404).send();
            } else {
                res.status(200).send(result);
            }
        }
        )
    })

    router.put('/staff/modal/:id', (req, res) => {
        DBconnect.query(
            `
            UPDATE staff
            SET
            position_id=${req.body.position_id},
            first_name="${req.body.first_name}",
            last_name="${req.body.last_name}",
            patronymic="${req.body.patronymic}",
            id_card="${req.body.id_card}",
            id_FIN="${req.body.id_FIN}",
            adress="${req.body.adress}",
            private_phone="${req.body.private_phone}",
            private_email="${req.body.private_email}",
            work_phone="${req.body.work_phone}",
            work_email="${req.body.work_email}",
            salary_card="${req.body.salary_card}",
            social_insurance="${req.body.social_insurance}",
            salary="${req.body.salary}",
            note="${req.body.note}"
            WHERE id=${req.params.id}
            AND staff.status=true
            `, (error, result) => {
            if (error) {
                console.log('editStaff Error => ', error);
                res.status(404).send();
            } else {
                res.status(200).send();
            }
        }
        )

        router.delete('/staff/modal/:id', (req, res) => {
            DBconnect.query(
                `
                UPDATE staff
                SET status=false
                WHERE id=${req.params.id}
                `, (error, result) => {
                    if (error) {
                        console.log('deleteStaff Error => ', error);
                        res.status(404).send();
                    } else {
                        res.status(200).send();
                    }
                }
            )
        })
    })

    return router;

}

export default {
    route,
    routePrefix: `/${config.version}/panel`
}