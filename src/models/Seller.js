class Seller {
    constructor(id, name, lastName, email, charge, contact) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.charge = charge;
        this.contact = contact;
    }

    valid() {
        if (!this.id || this.id?.toString().length == 0) {
            throw { status: 400, message: "El id es obligatorio" };
        }
        if (!this.name || this.name?.toString().length == 0) {
            throw { status: 400, message: "El nombre es obligatorio" };
        }
        if (!this.lastName || this.lastName?.toString().length == 0) {
            throw { status: 400, message: "El apellido es obligatorio" };
        }
        if (!this.email || this.email?.toString().length == 0) {
            throw { status: 400, message: "El email es obligatorio" };
        }
        if (!this.charge || this.charge?.toString().length == 0) {
            throw { status: 400, message: "El cargo es obligatorio" };
        }
        if (!this.contact || this.contact?.toString().length == 0) {
            throw { status: 400, message: "El contacto es obligatorio" };
        }
    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
            lastName: this.lastName,
            email: this.email,
            charge: this.charge,
            contact: this.contact,
        };
    }
}

module.exports = Seller;