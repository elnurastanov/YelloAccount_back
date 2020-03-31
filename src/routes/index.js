import SalaryRouter from './salary/salaryRouter'
import LeaderRouter from './Leader/leaderRouter'


const AppRoutes = (app) => {
    app.use(SalaryRouter.routePrefix, SalaryRouter.route()),
    app.use(LeaderRouter.routePrefix, LeaderRouter.route())
}

export default AppRoutes;