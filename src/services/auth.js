const UserService = require("./users");
const { encrypt, compare } = require("../libs/encryption");
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
        data.emailValidationUUIDExpiration = addMinutes(new Date(), 25);

        const userService = new UserService();
        const result = await userService.create(data);

        if(!result.success) {
            return {
                success: false,
                messages: result.messages
            };
        }

        try {
            const validationURL = `${production ? backendURL : backendURLDev}/api/auth/verify/${data.emailValidationUUID}`;
            await new Email(result.user, validationURL).sendEmailVerification();
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
            message: "Completa tu registro a través del mensaje que enviamos a tu Correo Electrónico"
        };
    }

    async validateEmail(emailVerificationUUID) {
        const userService = new UserService();
        const user = await userService.getByEmailValidationUUID(emailVerificationUUID);

        if(!user) {
            return {
                success: false,
                messages: ["Es necesario un token válido o que no halla expirado aún"]
            };
        }

        user.isEmailValid = true;
        user.emailValidationUUID = null;
        user.emailValidationUUIDExpiration = null;

        const result = await userService.update(user.id, user);

        return this.#getUserData(result.user);
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

    async forgotPassword(email) {
        const userService = new UserService();
        const user = await userService.getByEmail(email);

        if(!user) {
            return {
                success: false,
                messages: ["No hay ningún usuario con ese Correo Electrónico"]
            };
        }

        user.passwordResetToken = uuid.v4();
        user.passwordResetTokenExpiration = addMinutes(new Date(), 10);
        await userService.update(user.id, user);

        try {
            const resetURL = `${production ? backendURL : backendURLDev}/api/auth/resetPassword/${user.passwordResetToken}`;
            await new Email(user, resetURL).sendPasswordReset();

            return {
                success: true,
                message: "Se ha enviado el token de verificación a su Correo Electrónico!"
            };
        } catch(error) {
            user.passwordResetToken = null;
            user.passwordResetTokenExpiration = null;
            await userService.update(user);

            return {
                success: false,
                messages: ["Hubo un error al enviar el correo electrónico. ¡Inténtalo de nuevo más tarde!"]
            };
        }
    }

    async resetPassword(passwordResetToken, newPassword) {
        const userService = new UserService();
        const user = await userService.getByPasswordResetToken(passwordResetToken);

        if(!user) {
            return {
                success: false,
                messages: ["Es necesario un token válido o que no halla expirado aún"]
            };
        }

        user.password = await encrypt(newPassword);
        user.passwordResetToken = null;
        user.passwordResetTokenExpiration = null;
        user.passwordChangedAt = new Date();

        const result = await userService.update(user.id, user);

        return this.#getUserData(result.user);
    }

    async updatePassword(email, newPassword) {
        const userService = new UserService();
        const user = await userService.getByEmail(email);

        user.password = await encrypt(newPassword);

        const result = await userService.update(user.id, user);

        return this.#getUserData(result.user);
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
