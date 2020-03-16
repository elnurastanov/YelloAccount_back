import SalaryRouter from './salary/salaryRouter'


const AppRoutes = (app) => {
    app.use(SalaryRouter.routePrefix, SalaryRouter.route())
}

export default AppRoutes;