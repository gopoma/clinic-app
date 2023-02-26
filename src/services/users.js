const UsuarioModel = require("../models/usuario");
const handleDBExceptions = require("../helpers/handleDBExceptions");

class UserService {
    async create(data) {
        try {
            const user = await UsuarioModel.create(data);

            // Remove password from output
            user.password = undefined;

            return {
                success: true,
                user
            };
        } catch(error) {
            return handleDBExceptions(error);
        }
    }

    async getByIdentificacion(identificacion) {
        const user = await UsuarioModel.findOne({ identificacion }).select("+password");

        return user;
    }

    async delete(idUser) {
        const user = await UsuarioModel.findById(idUser);

        if(!user) {
            return {
                success: false,
                messages: ["No existe un usuario por ese id"]
            };
        }

        await UsuarioModel.findByIdAndDelete(idUser);

        return {
            success: true,
            message: "Usuario eliminado"
        };
    }
}

module.exports = UserService;
