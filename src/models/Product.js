class Product {
    constructor(id, name, description,price) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price
    }
  
    valid() {
      if (!this.id || this.id?.toString().length == 0) {
        throw { status: 400, message: "El id es obligatorio" };
      }
      if (!this.name || this.name?.toString().length == 0) {
        throw { status: 400, message: "El nombre es obligatorio" };
      }
      if (!this.description || this.description?.toString().length == 0) {
        throw { status: 400, message: "La descripcion es obligatoria" };
      }
      if (!this.price || this.description?.toString().length == 0) {
        throw { status: 400, message: "El precio es obligatori0" };
      }
    }
  
    toJson() {
      return {
        id: this.id,
        name: this.name,
        description: this.description,
        price: this.price
      };
    }
  }
  
  module.exports = Product;