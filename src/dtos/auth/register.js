const { Type } = require("@sinclair/typebox");
const {
    nombreDTOSchema,
    direccionDTOSchema,
    identificacionDTOSchema,
    emailDTOSchema,
    telefonoDTOSchema,
    passwordDTOSchema,
    roleDTOSchema,
    birthdayDTOSchema,
    servicesDTOSchema
} = require("../users/types");

const RoleRegisterDTOSchema = Type.Object(
    { role: roleDTOSchema },
    { errorMessage: { required: { role: "Proporcione role" } } }
);

const PacienteRegisterDTOSchema = Type.Object(
    {
        nombre: nombreDTOSchema,
        direccion: direccionDTOSchema,
        identificacion: identificacionDTOSchema,
        email: emailDTOSchema,
        telefono: telefonoDTOSchema,
        password: passwordDTOSchema,
        role: roleDTOSchema,
        birthday: birthdayDTOSchema
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: "No proporciones más propiedades de las necesarias",
            required: {
                nombre: "Proporcione nombre",
                direccion: "Proporcione direccion",
                identificacion: "Proporcione identificacion",
                email: "Proporcione email",
                telefono: "Proporcione telefono",
                password: "Proporcione password",
                role: "Proporcione role",
                birthday: "Proporcione birthday"
            }
        }
    }
);

const HospitalRegisterDTOSchema = Type.Object(
    {
        nombre: nombreDTOSchema,
        direccion: direccionDTOSchema,
        identificacion: identificacionDTOSchema,
        email: emailDTOSchema,
        telefono: telefonoDTOSchema,
        password: passwordDTOSchema,
        role: roleDTOSchema,
        services: servicesDTOSchema
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: "No proporciones más propiedades de las necesarias",
            required: {
                nombre: "Proporcione nombre",
                direccion: "Proporcione direccion",
                identificacion: "Proporcione identificacion",
                email: "Proporcione email",
                telefono: "Proporcione telefono",
                password: "Proporcione password",
                role: "Proporcione role",
                services: "Proporcione services",
            }
        }
    }
);

module.exports = {
    RoleRegisterDTOSchema,
    PacienteRegisterDTOSchema,
    HospitalRegisterDTOSchema,
};
