import Register from './register/addUser'
import Login from './login/login'
import Users from './users/users'
import UsersModal from './users/modalRoute/modifyUsers'
import PanelAuth from './auth/authPanel'
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
import StaffById from './staff/modalRoute/modifyStaff'
import staffWithFIN from './staff/staffWithFIN'


const AppRoutes = (app) => {
    app.use(Register.routePrefix, Register.route()),
    app.use(Login.routePrefix, Login.route()),
    app.use(Users.routePrefix, Users.route()),
    app.use(UsersModal.routePrefix, UsersModal.route()),
    app.use(PanelAuth.routeprefix, PanelAuth.route()),
    app.use(OrganizationCompany.routePrefix, OrganizationCompany.route()),
    app.use(OrganizationCompanyModal.routePrefix, OrganizationCompanyModal.route()),
    app.use(OrganizationDepartment.routePrefix, OrganizationDepartment.route()),
    app.use(OrganizationDepartmentModal.routePrefix, OrganizationDepartmentModal.route()),
    app.use(OrganizationDepartmentByCompanyId.routePrefix, OrganizationDepartmentByCompanyId.route()),
    app.use(OrganizationPosition.routePrefix, OrganizationPosition.route()),
    app.use(OrganizationPositionModal.routePrefix, OrganizationPositionModal.route()),
    app.use(OrganizationPositionByDepartmentId.routePrefix, OrganizationPositionByDepartmentId.route()),
    app.use(OrganizationCount.routePrefix, OrganizationCount.route()),
    app.use(Staff.routePrefix, Staff.route()),
    app.use(StaffById.routePrefix, StaffById.route())
    app.use(staffWithFIN.routePrefix, staffWithFIN.route())
}

export default AppRoutes;