import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import config from '../../../config'
import DBconnect from '../../../database/dbconnection'
import messages from '../../messages'
import Authorization from '../../middleware/authorization'

const route = () => {

    const Router = new express.Router()

    Router
        .get('/users/:id', async (req, res) => {

            try {

                const rows = await DBconnect.promise().query(
                    `
                        SELECT
                        users.username AS username,
                        GROUP_CONCAT(roles.name SEPARATOR ',') AS role
                        FROM users
                        INNER JOIN users_roles
                        INNER JOIN roles
                        WHERE users.id=${req.params.id}
                        AND users_roles.user=users.id
                        AND users_roles.role=roles.id
                        AND users_roles.role_status=true
                    `
                )

                const result = rows[0]

                if (result[0].username === null || result[0].role === null) res.status(404).json({ "error": messages.notFound })

                const data = {
                    username: result[0].username,
                    role: result[0].role = result[0].role.split(',')
                }

                res.status(200).send(data)

            } catch (error) {

                console.log(`Get User By Id Error => ${error}`)
                res.status(500).send()

            }
        })

        .post('/users', async (req, res) => {

            const { id, password } = req.body
            const token = req.headers.authorization

            try {

                const hash = await bcrypt.hash(password, 10)

                try {

                    const userdata = await jwt.verify(token, config.key)

                    await DBconnect.promise().query(
                        `
                            UPDATE users
                            SET
                            pswd = "${hash}",
                            update_user = ${userdata.id},
                            update_date = "${moment().format()}"
                            WHERE id = ${id}
                            AND user_status = true
                        `
                    )

                    res.status(200).send({ message: messages.changedUserPassword })

                } catch (error) {

                    console.log(`Updating user password Error => ${error}`);
                    res.status(500).send()

                }

            } catch (error) {

                console.log(`Hashing New Password Error => ${err}`);
                res.status(500).send()

            }
        })

        .put('/users', async (req, res) => {

            const token = req.headers.authorization
            let roles = []
            for (let i = 0; i < req.body.role.length; i++) {
                if (req.body.role[i] === "Super Admin") roles.push(1)
                if (req.body.role[i] === "Adminstrator") roles.push(2)
                if (req.body.role[i] === "Accountant") roles.push(3)
                if (req.body.role[i] === "Human Resources") roles.push(4)
                if (req.body.role[i] === "Customer Services") roles.push(5)
                if (req.body.role[i] === "Employee") roles.push(6)
            }

            try {

                const userdata = await jwt.verify(token, config.key)

                for( let i = 1; i < 6;i++ ) {

                    await DBconnect.promise().query(
                        `
                            UPDATE users_roles
                            SET role_status = false
                            WHERE user = ${req.body.id}
                            AND role = ${i}
                        `
                    );

                }

                let query = roles.map(val => {

                    return `UPDATE users_roles 
                            SET 
                            role_status = true,
                            update_user = ${userdata.id},
                            update_date = "${moment().format()}"
                            WHERE user = ${req.body.id} 
                            AND role=${val}`

                })


                try {

                    for (let j = 0; j < query.length; j++) {


                        await DBconnect.promise().query(query[j]);

                    }
                    res.status(200).json({ message: messages.modifyUserRoleSuccess });

                } catch (error) {

                    res.status(500).send();
                    console.log(`Updating Users Roles Error => ${error}`)

                }

            } catch (error) {

                res.status(500).send(error);
                console.log(`Resetting Users Roles Error => ${error}`)

            }

        })

    return Router;

}

export default {
    route,
    routePrefix: `/${config.version}/panel`
}