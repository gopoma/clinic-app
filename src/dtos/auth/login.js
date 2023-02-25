const { Type } = require("@sinclair/typebox");
const {
    identificacionDTOSchema,
    passwordDTOSchema
} = require("../users/types");


const LoginDTOSchema = Type.Object(
    {
        identificacion: identificacionDTOSchema,
        password: passwordDTOSchema
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: "No proporciones más propiedades de las necesarias",
            required: {
                identificacion: "Proporcione identificacion",
                password: "Proporcione password",
            }
        }
    }
);


module.exports = LoginDTOSchema;
