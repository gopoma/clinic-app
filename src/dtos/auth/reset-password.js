const { Type } = require("@sinclair/typebox");
const { passwordDTOSchema } = require("../users/types");


const ResetPasswordDTOSchema = Type.Object(
    {
        newPassword: passwordDTOSchema
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: "No proporciones más propiedades de las necesarias",
            required: {
                newPassword: "Proporcione newPassword",
            }
        }
    }
);


module.exports = ResetPasswordDTOSchema;
