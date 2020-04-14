import OrganizationCompany from './organization/company'
import OrganizationCompanyModal from './organization/modalRoute/companyModal'
import OrganizationDepartment from './organization/department'
import OrganizationPosition from './organization/position'



const AppRoutes = (app) => {
    app.use(OrganizationCompany.routePrefix, OrganizationCompany.route()),
    app.use(OrganizationCompanyModal.routePrefix, OrganizationCompanyModal.route()),
    app.use(OrganizationDepartment.routePrefix, OrganizationDepartment.route()),
    app.use(OrganizationPosition.routePrefix, OrganizationPosition.route())
}

export default AppRoutes;