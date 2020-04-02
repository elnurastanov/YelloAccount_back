import express from 'express'
import config from '../../config'
import DBconnect from '../../database/dbconnection'
import moment from 'moment'

const route = () => {

    const router = new express.Router();

    router.route('/salary').post((req, res) => {
        console.log(req.body);
        console.log(moment('01-03-2020', 'DD-MM-YYYY').format("YYYY-MM-DD"));

        DBconnect.query(
            `INSERT INTO salary_payment (
            sp_executing_company, 
            sp_payment_channel, 
            sp_payment_date, 
            sp_partner, 
            sp_destination, 
            sp_vendor, 
            sp_expense_type, 
            sp_month_salary, 
            sp_paid, 
            sp_result, 
            sp_result_percent) 
            VALUES
             (
                "${req.body.Executing_companyForm}" ,
                "${req.body.Payment_channelForm}",
                "${moment(req.body.formDate, 'DD-MM-YYYY').format("YYYY-MM-DD")}", 
                "${req.body.PartnerForm}", 
                "${req.body.DestinationForm}", 
                "${req.body.VendorForm}", 
                "${req.body.expense_typeForm}", 
                "${req.body.monthSalary}", "${req.body.paidSalary}", 
                "${req.body.monthSalary - req.body.paidSalary}",
                "${req.body.paidSalary / req.body.monthSalary * 100}"
                )`,

            (err, result) => {
                if (err) throw err;
                console.log("1 record inserted", result);
                res.status(200).send((result.insertId).toString());
            })
    })

    return router;

}

export default {
    route,
    routePrefix: `/${config.version}/panel`
}