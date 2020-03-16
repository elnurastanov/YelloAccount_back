import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'

const route = () => {

    const router = new express.Router();

    router.route('/salary').post((req, res) => {
        res.send(req.body)
        console.log(req.body);
        
        // 
        DBconnect.query(`INSERT INTO salary_payment (sp_executing_company, sp_payment_channel, sp_payment_date, sp_partner, sp_destination, sp_vendor, sp_expense_type, sp_month_salary, sp_paid) VALUES ("${req.body.Executing_companyForm}" , "${req.body.Payment_channelForm}", "${req.body.formDate}", "${req.body.PartnerForm}", "${req.body.DestinationForm}", "${req.body.VendorForm}", "${req.body.expense_typeForm}", "${req.body.monthSalary}", "${req.body.paidSalary}")`,
            (err, result) => {
            if (err) throw err;
            console.log(result, "1 record inserted");
            })
    })

        return router;

}

export default {
        route,
        routePrefix: `/${config.version}/panel`
}