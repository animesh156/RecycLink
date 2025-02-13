const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// generate JWT
 const generateToken = (id) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '5h'
    })
 }


//  store toke in HTTP-only cooie
res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
})


// @desc Register a new uer
// @route POST /auth/register
// @access Public
const registerUser = async (req,res) => {
    

    


}





// @desc Login a new uer
// @route POST /auth/login
// @access Public
const loginUser = async (req,res) => {
   
//    login logic coe

}



module.exports = {
    registerUser, loginUser
}