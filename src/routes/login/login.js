import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'
import messages from '../messages'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const route = () => {

    const router = new express.Router()

    router.post('/login', (req, res) => {

        let credential = req.body

        DBconnect.query(
            `
                SELECT 
                users.id AS id,
                users.username AS username,
                users.pswd AS password,
                roles.name AS role,
                CONCAT(staff.first_name, " ", staff.last_name) AS staff
                FROM users
                INNER JOIN users_roles
                INNER JOIN roles
                INNER JOIN staff
                WHERE username="${credential.username}"
                AND users_roles.user=users.id
                AND users_roles.role=roles.id
                AND users.staff_id=staff.id
            `, (error, result) => {

            if (error) res.status(500).send()

            if (result.length === 0) res.status(404).json({ "error": messages.userNotFound })

            else {
                let user = {
                    id: result[0].id,
                    username: result[0].username,
                    password: result[0].password,
                    staff: result[0].staff,
                    role: []
                }
                
                user.role = result.map((value, index) => user.role[index] = value.role)

                bcrypt.compare(credential.password, user.password, (err, check) => {

                    if (check) {

                        const token = jwt.sign({
                            id: user.id,
                            username: user.username,
                            role: user.role
                        }, config.key);

                        res.status(200).json({ "token": token, "staff":  user.staff});

                    } else return res.status(401).json({ "error": messages.inCorrectPassword })
                })
            }
        })
    })

    return router;

}

export default {
    route,
    routePrefix: `/${config.version}/panel`
}