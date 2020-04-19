import OrganizationCompany from './organization/company'
import OrganizationCompanyModal from './organization/modalRoute/companyModal'
import OrganizationDepartment from './organization/department'
import OrganizationDepartmentModal from './organization/modalRoute/departmentModal'
import OrganizationDepartmentByCompanyId from './organization/departmentByCompany'
import OrganizationPosition from './organization/position'
import OrganizationPositionModal from './organization/modalRoute/positionModal'
import OrganizationPositionByDepartmentId from './organization/positionByDepartment'
import OrganizationCount from './organization/organizationCount'
import Staff from './staff/staff'



const AppRoutes = (app) => {
    app.use(OrganizationCompany.routePrefix, OrganizationCompany.route()),
    app.use(OrganizationCompanyModal.routePrefix, OrganizationCompanyModal.route()),
    app.use(OrganizationDepartment.routePrefix, OrganizationDepartment.route()),
    app.use(OrganizationDepartmentModal.routePrefix, OrganizationDepartmentModal.route()),
    app.use(OrganizationDepartmentByCompanyId.routePrefix, OrganizationDepartmentByCompanyId.route()),
    app.use(OrganizationPosition.routePrefix, OrganizationPosition.route()),
    app.use(OrganizationPositionModal.routePrefix, OrganizationPositionModal.route()),
    app.use(OrganizationPositionByDepartmentId.routePrefix, OrganizationPositionByDepartmentId.route()),
    app.use(OrganizationCount.routePrefix, OrganizationCount.route()),
    app.use(Staff.routePrefix, Staff.route())
}

export default AppRoutes;