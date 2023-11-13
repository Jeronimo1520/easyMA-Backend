class User{
    constructor(name,  email, password){
        this.name = name;
        this.email = email;
        this.password = password;
    }

    valid(){
        if(!this.name || this.name?.toString().lenght == 0){
            throw {status:400, message: "El name es obligatorio"};
        } 
        if(!this.email || this.email?.toString().lenght == 0){
            throw {status:400, message: "El email es obligatorio"};
        } 
        if(!this.password || this.password?.toString().lenght == 0){
            throw {status:400, message: "El password es obligatorio"};
        } 
    }

    toJson(){
        return {
            name: this.name,
            email: this.email,
            password: this.password
        };
    }
}

module.exports = User;