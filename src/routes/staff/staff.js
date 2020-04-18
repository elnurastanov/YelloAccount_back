import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'

const route = () => {

    const router = new express.Router();

    router.post('staff', (req, res) => {
        DBconnect.query(
            `
            INSERT INTO staff
            (
                position_id,
                first_name,	
                last_name,	
                patronymic,	
                id_card, 
                id_FIN,	
                adress,	
                join_date,	
                private_phone,	
                private_email,	
                note
            )
            VALUES
            (
                ${req.body.position_id},
                "${req.body.first_name}",
                "${req.body.last_name}",
                "${req.body.patronymic}",
                "${req.body.id_card}",
                "${req.body.id_FIN}",
                "${req.body.adress}",
                ${req.body.join_date},
                "${req.body.private_phone}",
                "${req.body.private_email},
                "${req.body.note}""
            )
            `, (error, result) => {
                if(error){
                    console.log('addStaff Error => ', error);
                    res.status(500).send();
                }else{
                    res.status(201).send();
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