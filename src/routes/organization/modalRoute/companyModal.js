import express from 'express'
import config from '../../../config'
import DBconnect from '../../../database/dbconnection'

const route = () => {

    const router = new express.Router();

    router.get('/organization/company/modal/:id', (req, res) => {
        DBconnect.query(
            `SELECT name, direction
                     FROM company
                     WHERE id= ${req.params.id}`
            ,
            (error, result) => {
                if (error) {
                    console.log('getCompanyByID Error => ', error);
                    res.status(500).send('INTERNAL')
                } else {
                    if (result.length === 0) {
                        res.status(404).send()
                    } else {
                        res.status(200).send(result)
                    }
                }
            })
    })

    router.post('/organization/company/modal', (req, res) => {
        DBconnect.query(
            `INSERT INTO company
                        (name, direction)
                        VALUES
                        (
                            "${req.body.name}", 
                            "${req.body.direction}"
                        )`,
            (error, result) => {
                if (error) {
                    console.log('addCompany Error => ', error);
                    res.status(500).send()
                } else {
                    res.status(201).send()
                }
            }
        )
    })

    router.put('/organization/company/modal/:id', (req, res) => {
        DBconnect.query(
            `UPDATE company
            SET name="${req.body.name}", direction="${req.body.direction}"
            where id=${req.params.id}`,
            (error, result) => {
                if (error) {
                    console.log('editCompany Error => ', error);
                    res.status(404).send()
                } else {
                    res.status(200).send()
                }
            }
        )
    })

    router.delete('/organization/company/:id', (req, res) => {
        DBconnect.query(
            `DELETE FROM company
            WHERE id=${req.params.id}`,
            (error, result) => {
                if(error){
                    console.log('deleteCompany Error => ', error);
                    res.status(404).send()
                }else{
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