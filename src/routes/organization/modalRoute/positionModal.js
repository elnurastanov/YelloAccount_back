import express from 'express'
import config from '../../../config'
import DBconnect from '../../../database/dbconnection'

const route = () => {
    const router = new express.Router()

    router.get('/organization/position/modal/:id', (req, res) => {
        DBconnect.query(
            `
            SELECT department_id, name
            FROM positions
            WHERE id=${req.params.id}
            `, (error, result) => {
                if(error){
                    console.log('getPositionsById Error => ', error);
                    res.status(404),send()
                }else{
                    res.status(200).send(result)
                }
            }
        )
    })
    
    router.post('/organization/position/modal', (req, res) => {
        DBconnect.query(
            `
            INSERT INTO positions
            (department_id, name)
            VALUES
            (${req.body.id}, "${req.body.name}")
        `, (error, result) => {
            if (error) {
                console.log('addPosition Error => ', error);
                res.status(404).send()
            } else {
                res.status(201).send()
            }
        }
        )
    })

    router.put('/organization/position/modal/:id', (req, res) => {
        DBconnect.query(
            `
            UPDATE positions
            SET department_id=${req.body.department_id}, name="${req.body.name}"
            where id=${req.params.id}
            `, (error, result) => {
                if (error) {
                    console.log('editPosition Error => ', error);
                    res.status(404).send()
                } else {
                    res.status(200).send()
                }
            }
        )
    })

    router.delete('/organization/position/:id', (req, res) => {
        DBconnect.query(
            `
            DELETE FROM positions 
            WHERE id=${req.params.id}
            `, (error, result) => {
            if (error) {
                console.log('deletePosition Error => ', error);
                res.status(404).send()
            } else {
                res.status(200).send()
            }
        }
        )
    })

    return router;
}

export default {
    route,
    routePrefix: `/${config.version}/panel`
}