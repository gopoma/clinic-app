const UsuarioModel = require("../models/usuario");
const handleDBExceptions = require("../helpers/handleDBExceptions");

class UserService {
    async create(data) {
        try {
            const user = await UsuarioModel.create(data);

            return {
                success: true,
                user
            };
        } catch(error) {
            return handleDBExceptions(error);
        }
    }
}

module.exports = UserService;
