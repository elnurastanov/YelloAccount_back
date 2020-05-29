import express from 'express'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import config from '../../config'
import DBconnect from '../../database/dbconnection'
import messages from '../messages'


const route = () => {

    const Router = new express.Router()

    Router
        .get('/users', async (req, res) => {


            try {

                const result = await DBconnect.promise().query(
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
                    `
                )

                const data = result[0]

                for (let i = 0; i < data.length; i++) {

                    data[i].role = data[i].role.split(',');
                    data[i].key = i;
                    if (data[i].status === 1) data[i].status = "Aktiv";
                    if (data[i].status === 0) data[i].status = "Deaktiv"
                }

                res.status(200).send(data)
                
            } catch (error) {

                console.log(`Get User Error => ${error}`)
                res.status(500).send()
                
            }
        })

        .put('/users/:id', async (req, res) => {

            const userId = req.params.id
            const token = req.headers.authorization

            try {

                const userdata = await jwt.verify(token, config.key)

                await DBconnect.promise().query(
                    `
                        UPDATE users
                        SET
                        user_status = true,
                        update_user = ${userdata.id},
                        update_date = "${moment().format()}"
                        WHERE id = ${userId}
                        AND user_status = false
                    `
                )

                res.status(200).json({ message: messages.activatedUser })

            } catch (error) {

                console.log(`Update User Error => ${error}`)
                res.status(500).send()

            }
        })

        .delete('/users/:id', async (req, res) => {

            const userId = req.params.id
            const token = req.headers.authorization

            try {

                const userdata = await jwt.verify(token, config.key)

                await DBconnect.promise().query(
                    `
                        UPDATE users
                        SET 
                        user_status = false,
                        delete_user = ${userdata.id},
                        delete_date = "${moment().format()}"
                        WHERE id = ${userId}
                        AND user_status = true
                    `
                )

                res.status(200).json({ message: messages.deactivatedUser })

            } catch (error) {

                console.log(`Delete User Error => ${error}`)
                res.status(500).send()

            }
        })

    return Router;

}

export default {
    route,
    routePrefix: `/${config.version}/panel`
}