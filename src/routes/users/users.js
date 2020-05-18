import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'
import messages from '../messages'

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
                GROUP_CONCAT(roles.name SEPARATOR ',') AS role,
                users.user_status as status
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
                AND users_roles.role_status=true
                GROUP BY users.id
            `, (error, result) => {

            if (error) res.status(500).send()
            if (result) {

                for (let i = 0; i < result.length; i++) {

                    result[i].role = result[i].role.split(',');
                    result[i].key = i;
                    if(result[i].status === 1) result[i].status = "Aktiv";
                    if(result[i].status === 0) result[i].status = "Deaktiv"
                }
                res.status(200).send(result)
            }
        }
        )

    })

    Router.delete('/users/:id', (req, res) => {

        const userId = req.params.id

        DBconnect.query(
            `
                UPDATE users
                SET user_status = false
                WHERE id = ${userId}
            `, (error, result) => {

            if (error) res.status(500).send()
            if (result) res.status(200).json({ message: messages.deactivatedUser })

        }
        )
    })

    return Router;

}

export default {
    route,
    routePrefix: `/${config.version}/panel`
}