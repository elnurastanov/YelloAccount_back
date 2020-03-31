import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'

const route = () => {

    const router = new express.Router();

    router.route('/leader').post((req, res) => {
        
        if(req.body.panelStatus == true){
            DBconnect.query(`SELECT * FROM salary_payment ORDER BY _id DESC LIMIT 13`,
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result, "Data sent");
                    res.status(200).send(result);
                }

            })
        }else{
            console.log(req.body)
            res.status(400).send('Error');
        }
    })

    return router;

}

export default {
    route,
    routePrefix: `/${config.version}/panel`
}