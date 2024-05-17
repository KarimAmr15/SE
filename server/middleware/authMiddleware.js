const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt || req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (token) {
        jwt.verify(token, 'your-secret-key', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(401).send('Unauthorized');
            } else {
                req.user = decodedToken; // Store decoded token in request object
                next();
            }
        });
    } else {
        res.status(401).send('Unauthorized');
    }
}

module.exports = requireAuth;
