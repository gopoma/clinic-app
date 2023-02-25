const UserService = require("./users");
const { compare } = require("../libs/encryption");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

class AuthService {
    async register(data) {
        const userService = new UserService();
        const result = await userService.create(data);

        if(!result.success) {
            return {
                success: false,
                messages: result.messages
            };
        }

        return {
            success: true,
            user: result.user
        };
    }

    async login(data) {
        const { identificacion, password } = data;

        const userService = new UserService();
        const user = await userService.getByIdentificacion(identificacion);

        // eslint-disable-next-line
        if(!user || !(await compare(password, user.password))) {
            return {
                success: false,
                messages: ["Las credenciales son incorrectas"]
            };
        }

        // Remove password from output
        user.password = undefined;

        return this.#getUserData(user);
    }

    #getUserData(user) {
        const userToTokenize = {
            id: user.id,
            role: user.role
        };

        const token = this.#createToken(userToTokenize);
        return {
            success: true,
            user,
            token
        };
    }

    #createToken(payload) {
        const token = jwt.sign(payload, jwtSecret, {
            expiresIn: "7d"
        });

        return token;
    }
}

module.exports = AuthService;
