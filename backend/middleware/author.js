const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const authorization = async(req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            res.status(400).json({ error: "Signin to use features on this application" })
        }
        else {

            const decoded = jwt.verify(token, process.env.JWTSECRET)
            if (!decoded) {
                res.status(400).json({ error: "Invalid token" })
            }
            const user =await User.findById(decoded.userId).select('-password')
            
            if (!user) {
                res.status(400).json({ error: "User not found" })
            }

            req.user = user            
            next();
        }

    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: "error in authorization middleware" })
    }
}
module.exports = authorization