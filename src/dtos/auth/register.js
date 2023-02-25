const { Type } = require("@sinclair/typebox");
const {
    identificacionDTOSchema,
    emailDTOSchema,
    telefonoDTOSchema,
    passwordDTOSchema,
    roleDTOSchema
} = require("../users/types");


const RegisterDTOSchema = Type.Object(
    {
        identificacion: identificacionDTOSchema,
        email: emailDTOSchema,
        telefono: telefonoDTOSchema,
        password: passwordDTOSchema,
        role: roleDTOSchema
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: "No proporciones más propiedades de las necesarias",
            required: {
                identificacion: "Proporcione identificacion",
                email: "Proporcione email",
                telefono: "Proporcione telefono",
                password: "Proporcione password",
                role: "Proporcione role"
            }
        }
    }
);


module.exports = RegisterDTOSchema;
