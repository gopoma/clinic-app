const PacienteService = require("./pacientes");
const HospitalService = require("./hospitales");
const MedicoService = require("./medicos");
const UsuarioModel = require("../models/usuario");
const handleDBExceptions = require("../helpers/handleDBExceptions");

class UserService {
    async create(data) {
        try {
            const user = await UsuarioModel.create(data);

            switch(data.role) {
                case "PACIENTE": {
                    const pacienteService = new PacienteService();
                    const pacienteToStore = {
                        _id: user.id,
                        birthday: data.birthday
                    };

                    await pacienteService.create(pacienteToStore);
                    break;
                }
                case "HOSPITAL": {
                    const hospitalService = new HospitalService();
                    const hospitalToStore = {
                        _id: user.id,
                        services: data.services
                    };

                    await hospitalService.create(hospitalToStore);
                    break;
                }
                case "MEDICO": {
                    const medicoService = new MedicoService();
                    const medicoToStore = {
                        _id: user.id,
                        hospital: data.hospital
                    };

                    await medicoService.create(medicoToStore);
                    break;
                }
                default:
            }

            // Remove sensitive data from output
            user.password = undefined;
            user.isEmailValid = undefined;
            user.emailValidationUUID = undefined;
            user.emailValidationUUIDExpiration = undefined;


            return {
                success: true,
                user
            };
        } catch(error) {
            return handleDBExceptions(error);
        }
    }

    async getByEmail(email) {
        const user = await UsuarioModel.findOne({ email });

        return user;
    }

    async getByIdentificacion(identificacion) {
        const user = await UsuarioModel.findOne({ identificacion }).select("+password");

        return user;
    }

    async getByEmailValidationUUID(emailValidationUUID) {
        const user = await UsuarioModel.findOne({
            emailValidationUUID,
            emailValidationUUIDExpiration: { $gt: Date.now() }
        });

        return user;
    }

    async getByPasswordResetToken(passwordResetToken) {
        const user = await UsuarioModel.findOne({
            passwordResetToken,
            passwordResetTokenExpiration: { $gt: Date.now() }
        });

        return user;
    }

    async update(idUser, data) {
        const user = await UsuarioModel.findById(idUser);

        if(!user) {
            return {
                success: false,
                messages: ["No existe un usuario por ese id"]
            };
        }

        const updatedUser = await UsuarioModel.findByIdAndUpdate(idUser, data, { new: true });

        return {
            success: true,
            user: updatedUser
        };
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
