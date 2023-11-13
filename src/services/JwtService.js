const JWT = require ('jsonwebtoken');

const SECRET = 'f865b53623b121fd34ee5426c792e5c33af8c227';

const createToken = (payload) => {
    return JWT.sign(payload, SECRET, {expiresIn:'20s'});
};

const verifyToken = (token) => {
    return JWT.verify(token, SECRET);
}


module.exports = {createToken, verifyToken}

