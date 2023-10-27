class IDatabase {
    findAll(collectionName) {
      throw "Implementar método en elemento hijo";
    }
    findOne(collectionName, id) {
      throw "Implementar método en elemento hijo";
    }
    create(collectionName, payload) {
      throw "Implementar método en elemento hijo";
    }
    update(collectionName, payload, id) {
      throw "Implementar método en elemento hijo";
    }
    delete(collectionName, id) {
      throw "Implementar método en elemento hijo";
    }
    findByFilter(collectionName, filter) {
      throw "Implementar método en elemento hijo";
    }
  }
  
  module.exports = { IDatabase };