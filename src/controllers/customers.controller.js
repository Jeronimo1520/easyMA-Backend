require("express");
const Customer = require("../models/Customer");
const { MongoService } = require("../services/MongoService");

const collection = "customers";
const adapterDatabase = new MongoService();


class CustomersController {
    constructor() { }

    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async createCustomer(req, res) {
        try {
            console.log(req.body);
            let payload = req.body;

            // Verifica que los campos necesarios existen en el payload antes de crear la instancia
            if (!payload.id || !payload.name || !payload.lastname || !payload.email || !payload.address || !payload.charge || !payload.contact) {
                throw { status: 400, message: "Campos obligatorios faltantes" };
            }
            console.log(payload);
            const customer = new Customer(
                payload?.id,
                payload?.name,
                payload?.lastname,
                payload?.email,
                payload?.address,
                payload?.charge,
                payload?.contact
            );
            console.log(customer);
            customer.valid();

            const customerDb = await adapterDatabase.findByFilter(collection, ({id: customer.id}));
            if (customerDb) {
                throw {status:400, message:"El vendedor ya existe"};
            }

            const response = await adapterDatabase.create(collection, payload);
            payload.id = response.insertedId;
            payload.url = `http://localhost:3000/${collection}/${payload.id}`;
            res.status(201).json({
                ok: true,
                message: "Cliente creado exitosamente",
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
    async getCustomers(req, res) {
        try {
            const customers = await adapterDatabase.findAll(collection);
            res.status(200).json({
                ok: true,
                message: "Clientes consultados",
                info: customers,
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
    async getCustomer(req, res) {
        try {
            const id = req.params.id;
            const customer = await adapterDatabase.findOne(collection, id);
            if (!customer) {
                throw { status: 404, message: "El cliente no se encontro." };
            }
            res.status(200).json({
                ok: true,
                message: "Cliente consultado",
                info: customer,
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
    async updateCustomer(req, res) {
        try {
            let payload = req.body;
            const id = req.params.id;
            const customer = new Customer(
                payload?.id,
                payload?.name,
                payload?.lastname,
                payload?.email,
                payload?.address,
                payload?.charge,
                payload?.contact
            );
            customer.valid();
            const { modifiedCount: count } = await adapterDatabase.update(
                collection,
                payload,
                id
            );
            if (count == 0) {
                throw { status: 409, message: "Error al actualizar." };
            }
            payload.url = `http://localhost:3000/${collection}/${payload.id}`;
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
    async deleteCustomer(req, res) {
        try {
            const id = req.params.id;
            // deletedCount es la variable que destructuro: count el nombre de la variable que voy a usar
            const { deletedCount: count } = await adapterDatabase.delete(
                collection,
                id
            );
            if (count == 0) {
                
                throw { status: 404, message: "El cliente no se encontro." };
            }
            res.status(200).json({
                ok: true,
                message: "Cliente eliminado",
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
module.exports = CustomersController;
