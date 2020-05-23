
const Authenticated = (req, res, next) => {
    if (!req.headers.authorization) res.status(400).json({ message: "Token not provided" })
    if (req.headers.authorization) next()
}

export default Authenticated;