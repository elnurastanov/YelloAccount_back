import express from 'express'
import config from '../../config'
import messages from '../messages'
import DBconnect from '../../database/dbconnection'
import bcrypt from 'bcrypt'

const route = () => {

    const Router = new express.Router()

    Router
        .post('/register', (req, res) => {

            bcrypt.hash(req.body.password, 10, function (error, hash) {
                if (error) {

                    console.log(`Hashing password Error => ${error}`);
                    res.status(500).send()

                } else {
                    DBconnect.query(
                        `
                    INSERT INTO users
                    (staff_id, username, pswd, user_status)
                    VALUES
                    (
                        ${req.body.staff_id},
                        "${req.body.username}",
                        "${hash}",
                        true
                    )
                    `, (error, result) => {
                        if (error) {

                            console.log(`addUser Error => ${error}`);
                            res.status(400).json({ "error": messages.alreadyExistUser })

                        } else DBconnect.query(
                            `
                            INSERT INTO users_roles
                            (user, role, role_status)
                            VALUES
                            (${result.insertId}, 1, false),
                            (${result.insertId}, 2, false),
                            (${result.insertId}, 3, false),
                            (${result.insertId}, 4, false),
                            (${result.insertId}, 5, false),
                            (${result.insertId}, 6, true)
                        `, (err, success) => {
                            if (err) {

                                res.status(500).send();
                                console.log(`addUserRole Error => ${err}`);

                            } else res.status(201).send();

                        }
                        )

                    }
                    )
                }
            });

        })

    return Router;

}

export default {
    route,
    routePrefix: `/${config.version}`
}