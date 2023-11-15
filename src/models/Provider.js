class Provider {
    constructor(id, nombre, correo, cargo, producto,contacto,img) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.cargo = cargo;
        this.producto = producto;
        this.contacto = contacto;
        this.img = img;

    }

    valid() {
        if (!this.id || this.id?.toString().length == 0) {
            throw { status: 400, message: "El id es obligatorio" };
        }
        if (!this.nombre || this.name?.toString().length == 0) {
            throw { status: 400, message: "El nombre es obligatorio" };
        }
        if (!this.correo || this.lastName?.toString().length == 0) {
            throw { status: 400, message: "El correo es obligatorio" };
        }
        if (!this.cargo || this.email?.toString().length == 0) {
            throw { status: 400, message: "El cargo es obligatorio" };
        }
        if (!this.producto || this.charge?.toString().length == 0) {
            throw { status: 400, message: "El producto es obligatorio" };
        }
        if (!this.contacto || this.contact?.toString().length == 0) {
            throw { status: 400, message: "El contacto es obligatorio" };
        }
    }

    toJson() {
        return {
            id: this.id,
            nombre: this.nombre,
            correo: this.correo,
            cargo: this.cargo,
            producto: this.producto,
            contacto: this.contacto,
            img: this.img
        };
    }
}

module.exports = Provider;