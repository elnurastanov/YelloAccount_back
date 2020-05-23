import jwt from 'jsonwebtoken'
import config from '../../config'
import panelRoles from '../servicesRoles'

const Authorization = async ({token}) => {

    
    try {

        await jwt.verify(token, config.key)
        return true
        
    } catch (error) {
        
        return false

    }

}

export default Authorization;