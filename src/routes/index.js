import OrganizationCompany from './organization/company'
import OrganizationCompanyModal from './organization/modalRoute/companyModal'
import OrganizationDepartment from './organization/department'
import OrganizationDepartmentModal from './organization/modalRoute/departmentModal'
import OrganizationPosition from './organization/position'
import OrganizationPositionModal from './organization/modalRoute/positionModal'
import OrganizationCount from './organization/organizationCount'



const AppRoutes = (app) => {
    app.use(OrganizationCompany.routePrefix, OrganizationCompany.route()),
    app.use(OrganizationCompanyModal.routePrefix, OrganizationCompanyModal.route()),
    app.use(OrganizationDepartment.routePrefix, OrganizationDepartment.route()),
    app.use(OrganizationDepartmentModal.routePrefix, OrganizationDepartmentModal.route()),
    app.use(OrganizationPosition.routePrefix, OrganizationPosition.route()),
    app.use(OrganizationPositionModal.routePrefix, OrganizationPositionModal.route()),
    app.use(OrganizationCount.routePrefix, OrganizationCount.route())
}

export default AppRoutes;