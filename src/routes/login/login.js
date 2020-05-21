import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'
import messages from '../messages'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const route = () => {

    const router = new express.Router()

    router.post('/login', async (req, res) => {

        const credential = req.body

        try {

            const rows = await DBconnect.promise().query(
                `
                    SELECT 
                    users.id AS id,
                    users.username AS username,
                    users.pswd AS password,
                    GROUP_CONCAT( roles.name SEPARATOR ',') AS role,
                    CONCAT(staff.first_name, " ", staff.last_name) AS staff
                    FROM users
                    INNER JOIN users_roles
                    INNER JOIN roles
                    INNER JOIN staff
                    ON username="${credential.username}"
                    AND users_roles.user=users.id
                    AND users_roles.role=roles.id
                    AND users.staff_id=staff.id
                    AND users_roles.role_status=true
                `);

            let user = {}
            await rows[0].map(data => {
                user.id = data.id,
                    user.username = data.username,
                    user.password = data.password,
                    user.role = data.role,
                    user.staff = data.staff
            })
            
            if (user.id !== null) {

                try {

                    const result = await bcrypt.compare(credential.password, user.password)
                    if (result) {

                        const token = jwt.sign({
                            id: user.id,
                            username: user.username,
                            role: user.role
                        }, config.key);

                        res.status(200).json({ "token": token, "staff": user.staff, "role": user.role });

                    } else res.status(401).json({ "error": messages.inCorrectPassword })


                } catch (error) {

                    res.status(500).send();
                    console.log(`Bcrypt compare Error => ${error}`)

                }

            } else res.status(404).json({ "error": messages.userNotFound })



        } catch (error) {

            res.status(500).send();
            console.log(`Login Error => ${error}`)

        }

    })

    return router;

}

export default {
    route,
    routePrefix: `/${config.version}/panel`
}