const bcrypt = require('bcryptjs')

const User = require('../models/userModel')
const createJWTandSetCookie = require('../utils/JWT')


const login = async (req, res) => {
    try {

        const { username, password } = req.body;
        

        const userData = await User.findOne({ username })
        
        hashPass = await bcrypt.compare(password, userData?.password ||"" )

        if (!userData || !hashPass) {         
               
            res.status(400).json({ "error": "Invalud username or password" })
        }
        else {
            createJWTandSetCookie(userData._id, res);
            res.status(200).json({
                _id:userData._id,
                fullName: userData.fullName,
                username: userData.username,
                profilePic: userData.profilePic,
                gender: userData.gender
            })
        }

    } catch (error) {
        console.log(error);
        
    }
}

const signup = async (req, res) => {
    try {

        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            res.status(400).json({ "error": "Passwords not matching" })
        }
        else {

            const userExists = await User.findOne({ username })
            if (userExists) {
                res.status(400).json({ "error": "User with this username alreaday exists" })
            }
            else {

                const salt = await bcrypt.genSalt(10);
                const hashPass = await bcrypt.hash(password, salt)

                const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
                const femaleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`

                const newUser = new User({
                    _id:userData._id,
                    fullName: fullName,
                    username: username,
                    password: hashPass,
                    gender: gender,
                    profilePic: gender.toLowerCase().trim() === 'male' ? maleProfilePic : femaleProfilePic
                })
                newUser.save().then((data) => {
                    //jwt sign
                    createJWTandSetCookie(data._id, res)
                    res.status(201).json({
                        _id: data._id,
                        fullName: data.fullName,
                        username: data.username,
                        gender: data.gender,
                        profilePic: data.profilePic
                    })
                }).catch(err => console.log(err))
            }
        }
    } catch (error) {
        res.status(400).json({ "error": "error while creating user" })
    }
}

const logout = (req, res) => {
    res.cookie('jwt','',{maxAge:0})
    res.status(200).json({"msg":"Logout"})
}

module.exports = { login, signup, logout }