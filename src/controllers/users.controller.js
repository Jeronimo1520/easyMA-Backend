require("express");
const User = require("../models/Users");
const { MongoService } = require("../services/MongoService");
const { generateHash } = require("../services/Bcrypt");

const collection = "users";
const adapterDatabase = new MongoService();


class UsersController {
    constructor() { }

    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async createUser(req, res) {
        try {
            console.log(req.body);
            let payload = req.body;

            const user = new User(
                payload?.id,
                payload?.name,
                payload?.email,
                payload?.password
            );
            
            user.valid();

            payload.password = await generateHash(payload.password);
            console.log("password", payload.password);
            const response = await adapterDatabase.create(collection, payload);
            payload._id = response.insertedId;
    
            res.status(201).json({
                ok: true,
                message: "Usuario creado exitosamente",
                info: payload,
            });
        } catch (error) {
            console.error(error);
            res.status(error?.status || 500).json({
                ok: false,
                message: error?.message || error,
            });
        }
    }

    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async getUsers(req, res) {
        try {
            const users = await adapterDatabase.findAll(collection);
            res.status(200).json({
                ok: true,
                message: "Usuarios consultados",
                info: users,
            });
        } catch (error) {
            console.log(error);
            res.status(error?.status || 500).json({
                ok: false,
                message: error?.message || error,
            });
        }
    }
    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async getUser(req, res) {
        try {
            const id = req.params.id;
            const user = await adapterDatabase.findOne(collection, id);
            if (!user) {
                throw { status: 404, message: "El usuario no se encontro." };
            }
            res.status(200).json({
                ok: true,
                message: "Usuario consultado",
                info: user,
            });
        } catch (error) {
            console.error(error);
            res.status(error?.status || 500).json({
                ok: false,
                message: error?.message || error,
            });
        }
    }

    /**
     *
     * PENDIENTE:
     * - Realizar la validación de tarea y body
     * - Validar si el documento existe antes de actualizar
     * -
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async updateUser(req, res) {
        try {
            let payload = req.body;
            const id = req.params.id;
            const user = new User(
                payload?.id,
                payload?.name,
                payload?.email,
                payload?.password
            );
            user.valid();
            delete payload._id
            const { modifiedCount: count } = await adapterDatabase.update(
                collection,
                payload,
                id
            );
            if (count == 0) {
                throw { status: 409, message: "Error al actualizar." };
            }
            
            res.status(200).json({
                ok: true,
                message: "",
                info: payload,
            });
        } catch (error) {
            console.error(error);
            res.status(error?.status || 500).json({
                ok: false,
                message: error?.message || error,
            });
        }
    }

    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async deleteUser(req, res) {
        try {
            const id = req.params.id;
            // deletedCount es la variable que destructuro: count el nombre de la variable que voy a usar
            const { deletedCount: count } = await adapterDatabase.delete(
                collection,
                id
            );
            if (count == 0) {
                throw { status: 404, message: "El usuario no se encontro." };
            }
            res.status(200).json({
                ok: true,
                message: "Usuario eliminado",
                info: {},
            });
        } catch (error) {
            console.error(error);
            res.status(error?.status || 500).json({
                ok: false,
                message: error?.message || error,
            });
        }
    }
}
module.exports = UsersController;
