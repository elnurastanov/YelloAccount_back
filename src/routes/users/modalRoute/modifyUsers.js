import express from 'express'
import bcrypt from 'bcrypt'
import config from '../../../config'
import DBconnect from '../../../database/dbconnection'
import messages from '../../messages'

const route = () => {

    const Router = new express.Router()

    Router
        .get('/users/:id', (req, res) => {

            DBconnect.query(
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
            `, (error, result) => {

                if (error) res.status(500).send()
                if (result) {

                    if (result[0].username === null || result[0].role === null) res.status(404).json({ "error": messages.notFound })

                    const data = {
                        username: result[0].username,
                        role: result[0].role = result[0].role.split(',')
                    }

                    res.status(200).send(data)
                }
            }
            )
        })

        .post('/users', (req, res) => {


            const { id, password } = req.body

            bcrypt.hash(password, 10, (err, hash) => {

                if (err) {

                    console.log(`Hashing New Password Error => ${err}`);
                    res.status(500).send()

                }
                if (hash) {

                    DBconnect.query(
                        `
                            UPDATE users
                            SET pswd = "${hash}"
                            WHERE id = ${id}
                            AND user_status = true
                        `, (error, result) => {

                        if (error) {
                            console.log(`Updating user password Error => ${error}`);
                            res.status(500).send()
                        }
                        if (result) res.status(200).send({ message: messages.changedUserPassword })
                    }
                    )

                }

            })


        })

        .put('/users', async (req, res) => {

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

                await DBconnect.promise().query(
                    `
                        UPDATE users_roles
                        JOIN (
                            SELECT 1 as id, false as new_score2
                            UNION ALL
                            SELECT 2, false
                            UNION ALL
                            SELECT 3, false
                            UNION ALL
                            SELECT 4, false
                            UNION ALL
                            SELECT 5, false
                            UNION ALL
                            SELECT 6, true
                        ) vals ON user = ${req.body.id} AND role=vals.id
                        SET role_status = new_score2;
                    `);

                let query = roles.map(val => {

                    return `UPDATE users_roles SET role_status = true WHERE user = ${req.body.id} AND role=${val}`

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

                res.status(500).send();
                console.log(`Resetting Users Roles Error => ${error}`)

            }



        })

    return Router;

}

export default {
    route,
    routePrefix: `/${config.version}/panel`
}