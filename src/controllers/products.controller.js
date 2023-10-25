require("express");
class ProductsController {
    constructor() {}
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async createProduct(req, res) {
    try {
      let payload = req.body;
    } catch (error) {
      console.error(error);
      res.status(error?.status || 500).json({
        ok: false,
        message: error?.message || error,
      });
    }
  }

  async getProducts(req, res) {
    try {
      let payload = req.body;
    } catch (error) {
      console.error(error);
      res.status(error?.status || 500).json({
        ok: false,
        message: error?.message || error,
      });
    }
  }
  async getProduct(req, res) {
    try {
      let payload = req.body;
    } catch (error) {
      console.error(error);
      res.status(error?.status || 500).json({
        ok: false,
        message: error?.message || error,
      });
    }
  }

  async updateProduct(req, res) {
    try {
      let payload = req.body;
    } catch (error) {
      console.error(error);
      res.status(error?.status || 500).json({
        ok: false,
        message: error?.message || error,
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      let payload = req.body;
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