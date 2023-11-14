const { verifyToken } = require("../services/JwtService");
const {JsonWebTokenError} = require("jsonwebtoken");

require("express");

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {*} next 
 */


const AuthMiddleware = (req, res, next) =>{
    try{
        const {authorization} = req.headers;
        const token = authorization?.split(' ')[1];
        console.log(token);
        const user = verifyToken(token);
        req.user = user;
        next();

    } catch(error){
        if(error instanceof JsonWebTokenError){
        return res.status(400).json({
            ok:false,
            message: 'Este token no es válido',
        });
        };
        return res.status(500).json({
            ok:false,
            message:'Error Auth Middleware'
        });
    }
}

module.exports = {AuthMiddleware};