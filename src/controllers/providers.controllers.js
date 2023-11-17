require("express");
const Provider = require("../models/Seller");
const { MongoService } = require("../services/MongoService");

const collection = "providers";
const adapterDatabase = new MongoService();

class ProvidersController {
    constructor() { }

    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async createProvider(req, res) {
        try {
            console.log(req.body);
            let payload = req.body;

            // Verifica que los campos necesarios existen en el payload antes de crear la instancia
            if (!payload.id || !payload.nombre || !payload.correo || !payload.cargo || !payload.producto || !payload.contacto) {
                throw { status: 400, message: "Campos obligatorios faltantes" };
            }
            console.log(payload);
            const provider = new Provider(
                payload?.id,
                payload?.nombre,
                payload?.correo,
                payload?.cargo,
                payload?.producto,
                payload?.contacto
            );
            console.log(provider);
            provider.valid();

            const response = await adapterDatabase.create(collection, payload);
            payload.id = response.insertedId;
            payload.url = `http://localhost:3000/${collection}/${payload.id}`;
            res.status(201).json({
                ok: true,
                message: "Vendedor creado exitosamente",
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
    async getProviders(req, res) {
        try {
            const providers = await adapterDatabase.findAll(collection);
            res.status(200).json({
                ok: true,
                message: "Proveedores consultados",
                info: providers,
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
    async getProvider(req, res) {
        try {
            const id = req.params.id;
            const provider = await adapterDatabase.findOne(collection, id);
            if (!provider) {
                throw { status: 404, message: "El proveedor no se encontro." };
            }
            res.status(200).json({
                ok: true,
                message: "Vendedor consultado",
                info: provider,
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
    async updateProvider(req, res) {
        try {
            let payload = req.body;
            const id = payload.id;
            const provider = new Provider(
                payload?.id,
                payload?.nombre,
                payload?.correo,
                payload?.cargo,
                payload?.producto,
                payload?.contacto
            );
            provider.valid();
            delete payload._id
            const { modifiedCount: count } = await adapterDatabase.update(
                collection,
                payload,
                id
            );
            if (count == 0) {
                throw { status: 409, message: "Error al actualizar." };
            }
            payload.url = `http://localhost:3000/editar_proveedor/${payload._id}`;
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
    async deleteProvider(req, res) {
        try {
            const id = req.params.id;
            // deletedCount es la variable que destructuro: count el nombre de la variable que voy a usar
            const { deletedCount: count } = await adapterDatabase.delete(
                collection,
                id
            );
            if (count == 0) {
                throw { status: 404, message: "El proveedor no se encontro." };
            }
            res.status(200).json({
                ok: true,
                message: "Proveedor eliminado",
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
module.exports = ProvidersController;
