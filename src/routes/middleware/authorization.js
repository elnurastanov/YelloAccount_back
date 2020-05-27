import jwt from 'jsonwebtoken'
import config from '../../config'
import panelRoles from '../servicesRoles'
import messages from '../messages'

const Authorization = async (req, res, next) => {

    const token = req.headers.authorization
    const panel = req.params.panel
    const checker = arr => arr.some(x => x === true);

    if (req.params.panel !== 'login' && req.params.panel !== 'register' && req.params.panel !== 'panelauth') {
        try {

            const verifiedToken = await jwt.verify(token, config.key)
            const role = verifiedToken.role.split(",")
            const result = await panelRoles[panel].map(data => role.includes(data))
            if (checker(result)) next()
            else res.status(403).json({ message: messages.userNotPermission })

        } catch (error) {

            console.log(`Service Auth Error => ${error}`)
            res.status(500).send()

        }
    }
    else next()



}

export default Authorization;