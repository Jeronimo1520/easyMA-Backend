class Product {
    constructor(id, name, description) {
      this.id = id;
      this.name = name;
      this.description = description;
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
    }
  
    toJson() {
      return {
        id: this.id,
        name: this.name,
        description: this.description,
      };
    }
  }
  
  module.exports = Product;