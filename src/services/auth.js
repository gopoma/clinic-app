const UserService = require("./users");
const { compare } = require("../libs/encryption");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const { addMinutes } = require("date-fns");
const Email = require("../libs/email");
const {
    backendURL,
    backendURLDev,
    jwtSecret,
    production
} = require("../config");

class AuthService {
    async register(data) {
        data.emailValidationUUID = uuid.v4();
        data.emailValidationUUIDExpiration = addMinutes(new Date(), 10);

        const userService = new UserService();
        const result = await userService.create(data);

        if(!result.success) {
            return {
                success: false,
                messages: result.messages
            };
        }


        try {
            await new Email(result.user, `${production ? backendURL : backendURLDev}/api/auth/verify/${data.emailValidationUUID}`).sendEmailVerification();
        } catch(error) {
            await userService.delete(result.user.id);

            return {
                success: false,
                messages: ["Hubo un error en el momento de registrar al usuario. ¡Inténtalo de nuevo más tarde!"]
            };
        }

        return {
            success: true,
            user: result.user,
            messages: ["Completa tu registro a través del mensaje que enviamos a tu Correo Electrónico"]
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

        if(!user.isEmailValid) {
            return {
                success: false,
                messages: ["Termine de crear su cuenta validando su Correo Electrónico"]
            };
        }

        return this.#getUserData(user);
    }

    #getUserData(user) {
        const userToTokenize = {
            id: user.id,
            identificacion: user.identificacion,
            email: user.email,
            telefono: user.telefono,
            role: user.role
        };

        const token = this.#createToken(userToTokenize);

        return {
            success: true,
            user: userToTokenize,
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
