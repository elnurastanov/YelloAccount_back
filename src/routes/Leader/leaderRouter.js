import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'
import moment from 'moment'

const route = () => {

    const router = new express.Router();
    let Leaderİnfo = []

    router.route('/leader').post((req, res) => {
        
        if(req.body.panelStatus == true){
            DBconnect.query(`SELECT * FROM salary_payment ORDER BY _id DESC LIMIT 13`,
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result, "Data sent");
                    
                    result.map((data, index) => {
                        let obj = {
                            id : data._id,
                            create : moment(data.created_at).format("DD-MM-YYYY HH:mm:ss"),
                            company : data.sp_executing_company,
                            channel : data.sp_payment_channel,
                            date : moment(data.sp_payment_date).format("DD-MM-YYYY"),
                            partner : data.sp_partner,
                            destination : data.sp_destination,
                            vendor : data.sp_vendor,
                            type : data.sp_expense_type,
                            monthly : data.sp_month_salary,
                            paid : data.sp_paid,
                            result : data.sp_result,
                            percent : (data.sp_result_percent).toFixed(2)
                        }
                        Leaderİnfo[index] = obj
                       
                    })
                    
                    res.status(200).send(Leaderİnfo);
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