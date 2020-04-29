import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'
import messages from '../messages'
import { json } from 'body-parser'

const route = () => {

    const Router = new express.Router()

    Router.get('/users', (req, res) => {

        DBconnect.query(
            `
                SELECT
                users.id AS id,
                users.username AS username,
                CONCAT(company.name, " ", ">", " ", department.name, " ", ">", " ", positions.name) AS staff_meta,
                CONCAT(staff.first_name, ' ', staff.last_name, ' ', staff.patronymic) AS staff_fullname,
                GROUP_CONCAT(roles.name SEPARATOR ',') AS role
                FROM users
                INNER JOIN staff
                INNER JOIN positions
                INNER JOIN department
                INNER JOIN company
                INNER JOIN users_roles
                INNER JOIN roles
                WHERE users.staff_id=staff.id
                AND staff.position_id=positions.id
                AND positions.department_id=department.id
                AND department.company_id=company.id
                AND users_roles.user=users.id
                AND users_roles.role=roles.id
                GROUP BY users.id
            `, (error, result) => {

            if (error) res.status(500).send()
            if (result) {

                for(let i = 0; i < result.length; i++){
                    result[i].role = result[i].role.split(',');
                    result[i].key = i;
                }
                res.status(200).send(result)
            }
        }
        )

    })

    return Router;

}

export default {
    route,
    routePrefix: `/${config.version}/panel`
}