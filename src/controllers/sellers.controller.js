require("express");
const Seller = require("../models/Seller");
const { MongoService } = require("../services/MongoService");

const colletion = "sellers";
const adapterDatabase = new MongoService();


class SellersController {
    constructor() { }

    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async createSeller(req, res) {
        try {
            console.log(req.body);
            let payload = req.body;

            // Verifica que los campos necesarios existen en el payload antes de crear la instancia
            if (!payload.id || !payload.name || !payload.lastname || !payload.email || !payload.charge || !payload.contact) {
                throw { status: 400, message: "Campos obligatorios faltantes" };
            }
            console.log(payload);
            const seller = new Seller(
                payload?.id,
                payload?.name,
                payload?.lastname,
                payload?.email,
                payload?.charge,
                payload?.contact
            );
            console.log(seller);
            seller.valid();
            const response = await adapterDatabase.create(colletion, payload);
            payload.id = response.insertedId;
            payload.url = `http://localhost:3000/${colletion}/${payload.id}`;
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
    async getSellers(req, res) {
        try {
            const sellers = await adapterDatabase.findAll(colletion);
            res.status(200).json({
                ok: true,
                message: "Vendedores consultados",
                info: sellers,
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
    async getSeller(req, res) {
        try {
            const id = req.params.id;
            const seller = await adapterDatabase.findOne(colletion, id);
            if (!seller) {
                throw { status: 404, message: "El vendedor no se encontro." };
            }
            res.status(200).json({
                ok: true,
                message: "Vendedor consultado",
                info: seller,
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
    async updateSeller(req, res) {
        try {
            let payload = req.body;
            const id = req.params.id;
            const seller = new Seller(
                payload?.id,
                payload?.name,
                payload?.lastname,
                payload?.email,
                payload?.charge,
                payload?.contact
            );
            seller.valid();
            const { modifiedCount: count } = await adapterDatabase.update(
                colletion,
                payload,
                id
            );
            if (count == 0) {
                throw { status: 409, message: "Error al actualizar." };
            }
            payload.url = `http://localhost:3000/${colletion}/${payload.id}`;
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
    async deleteSeller(req, res) {
        try {
            const id = req.params.id;
            // deletedCount es la variable que destructuro: count el nombre de la variable que voy a usar
            const { deletedCount: count } = await adapterDatabase.delete(
                colletion,
                id
            );
            if (count == 0) {
                throw { status: 404, message: "El vendedor no se encontro." };
            }
            res.status(200).json({
                ok: true,
                message: "Vendedor eliminado",
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
module.exports = SellersController;
