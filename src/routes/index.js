import OrganizationCompany from './organization/company'
import OrganizationDepartment from './organization/department'


const AppRoutes = (app) => {
    app.use(OrganizationCompany.routePrefix, OrganizationCompany.route()),
    app.use(OrganizationDepartment.routePrefix, OrganizationDepartment.route())
}

export default AppRoutes;