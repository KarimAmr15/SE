const jwt = require('jsonwebtoken')
const requireAuth = (req, res, next)=>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, 'admin secret', (err, decodedToken)=>{
            if(err){
                console.log(err)
                res.redirect('/AdminLogin.html')
            } 
            else{
                // res.json(decodedToken)
                next()

            }
        })
    } 
    else{
        res.redirect('/AdminLogin.html')
    }
}

module.exports = requireAuth