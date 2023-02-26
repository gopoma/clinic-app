const { Type } = require("@sinclair/typebox");
const {
    nombreDTOSchema,
    direccionDTOSchema,
    identificacionDTOSchema,
    emailDTOSchema,
    telefonoDTOSchema,
    passwordDTOSchema,
} = require("../users/types");

const CreateMedicoDTOSchema = Type.Object(
    {
        nombre: nombreDTOSchema,
        direccion: direccionDTOSchema,
        identificacion: identificacionDTOSchema,
        email: emailDTOSchema,
        telefono: telefonoDTOSchema,
        password: passwordDTOSchema
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
            }
        }
    }
);

module.exports = CreateMedicoDTOSchema;
