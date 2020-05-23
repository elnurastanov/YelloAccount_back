import express from 'express'
import config from '../../config'
import panelRoles from '../servicesRoles'



const route = () => {

    const Router = new express.Router()

    Router
        .get('/panelauth/:panel/:role', async (req, res) => {
            
            const role = req.params.role
            const panel = req.params.panel
            const checker = arr => arr.some(x => x === true);
            
            try {

                let result = await panelRoles[panel].map(data => role.includes(data))
                
                if (checker(result)) res.status(200).send()
                else res.status(403).send()

            } catch (error) {

                res.status(500).send()

            }
        })

    return Router
}

export default {
    route,
    routeprefix: `/${config.version}/panel`
}