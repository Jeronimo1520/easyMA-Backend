require("express");
const { MongoService } = require("../services/MongoService");
const {createToken, verifyToken} = require("../services/JwtService")
const {TokenExpiredError} = require("jsonwebtoken");

const colletion = "users";
const adapterDatabase = new MongoService();


class AuthController {
    constructor() { }

    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */

    async login(req,res){
        try{
            const {email, password} = req.body;
            //Validar que si me estén enviando email & password
            const user = await adapterDatabase.findByFilter(colletion, {email, password});
            delete user.password
            if(!user){
                throw {status: 404, message: "El usuario no se encontró"};
            }
            //Crear token
            const token = createToken(user)
            res.status(200).json({
                ok:true,
                message:"Usuario encontrado",
                info:{ ...user, token},
            });
    } catch(error){
        console.error(error);
        res.status(error?.status || 500).json({
            ok:false,
            message: error?.message || error,
        });
    }
 
    }

    async verifyToken(req,res){
        try{
            const { token  } = req.body;
            const user = verifyToken(token);
            delete user.password
            if(!user){
                throw {status: 404, message: "Error verificando el token"};
            }
            
            res.status(200).json({
                ok:true,
                message:"Token verificado",
                info:{ ...user, token},
            });
    } catch(error){
        if(error instanceof TokenExpiredError){
        return res.status(400).json({
                ok:false,
                message: 'Este token no es válido',
            });
        };
        console.error(error);
        res.status(error?.status || 500).json({
            ok:false,
            message: error?.message || error,
        });
    }
 
    }
}
module.exports = AuthController;
