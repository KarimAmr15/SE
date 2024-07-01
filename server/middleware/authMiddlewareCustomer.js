const jwt = require('jsonwebtoken')
const requireAuth = (req, res, next)=>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, 'our secret', (err, decodedToken)=>{
            if(err){
                console.log(err)
                res.redirect('/Login.html')
            } 
            else{
                // res.json(decodedToken)
                next()

            }
        })
    } 
    else{
        res.redirect('/Login.html')
    }
}

module.exports = requireAuth