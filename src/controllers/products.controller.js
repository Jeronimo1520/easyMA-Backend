require("express");
const Product = require("../models/Product");
const { MongoService } = require("../services/MongoService");
const ConfigSerice = require("../services/ConfigService");

const collection = "products";
const adapterDatabase = new MongoService();
const config = new ConfigSerice();

class ProductsController {
  constructor() { }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async createProduct(req, res) {
    try {
      console.log(req.body);
      let payload = req.body;

      // Verifica que los campos necesarios existen en el payload antes de crear la instancia
      if (!payload.id || !payload.name || !payload.price || !payload.description) {
        throw { status: 400, message: "Campos obligatorios faltantes" };
      }
      console.log(payload);
      const product = new Product(
        payload?.id,
        payload?.name,
        payload?.description,
        payload?.price,
      );
      console.log(product);
      product.valid();
      const response = await adapterDatabase.create(collection, payload);
      payload.id = response.insertedId;
      payload.url = `http://localhost:3000/${collection}/${payload.id}`;

      res.status(201).json({
        ok: true,
        message: "Producto creado exitosamente",
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
  async createImageProfile(req, res) {
    try {
      const id = req.params.id;
      const img = req.files.img;
      if (img) {
        img.mv(`./docs/${img.md5}${img.name}`);
        const host = config.get("api_host");
        const url = `${host}static/${img.md5}${img.name}`;
        const user = await adapterDatabase.findOne(collection, id);
        user.img = url;
        // 
        await adapterDatabase.update(collection, user, id);

        res.status(200).json({
          ok: true,
          message: "Imagen del usuario guardada",
          info: user,
        });
      } else {
      res.status(400).json({
        ok: false,
        message: "No se encontro la imagen",
        info: {},
      });
    }
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
  async getProducts(req, res) {
    try {
      const products = await adapterDatabase.findAll(collection);
      res.status(200).json({
        ok: true,
        message: "Productos consultados",
        info: products,
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
  async getProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await adapterDatabase.findOne(collection, id);
      if (!product) {
        throw { status: 404, message: "El producto no se encontro" };
      }
      res.status(200).json({
        ok: true,
        message: "Producto consultado",
        info: product,
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
  async updateProduct(req, res) {
    try {
      let payload = req.body;
      const id = payload.id
      const product = new Product(
        payload?.id,
        payload?.name,
        payload?.description,
        payload?.price,
      );
      product.valid();
      delete payload._id
      const { modifiedCount: count } = await adapterDatabase.update(
        collection,
        payload,
        id
      );
      console.log(id);
      console.log(payload);
      if (count == 0) {
        throw { status: 409, message: "Error al actualizar." };
      }
      payload.url = `http://localhost:3000/editar_producto/${payload._id}`;
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
  async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      // deletedCount es la variable que destructuro: count el nombre de la variable que voy a usar
      const { deletedCount: count } = await adapterDatabase.delete(
        collection,
        id
      );
      if (count == 0) {
        throw { status: 404, message: "El producto no se encontro" };
      }
      res.status(200).json({
        ok: true,
        message: "Producto eliminado",
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
module.exports = ProductsController;
