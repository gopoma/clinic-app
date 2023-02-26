const { Type } = require("@sinclair/typebox");


const specialityDTOSchema = Type.String({
    isNotEmpty: true,
    maxLength: 255,
    transform: ["trim"],
    errorMessage: {
        type: "speciality debe de ser del tipo texto",
        isNotEmpty: "speciality no debe estar vacío",
        maxLength: "speciality debe tener como máximo 255 caracteres de longitud"
    }
});

const pacienteDTOSchema = Type.String({
    format: "MongoId",
    isNotEmpty: true,
    transform: ["trim"],
    errorMessage: {
        type: "paciente debe de ser del tipo texto",
        format: "El formato del paciente no es válido, debe cumplir la estructura de un MongoId",
        isNotEmpty: "paciente no debe estar vacío"
    }
});

const healthStatusDTOSchema = Type.String({
    isNotEmpty: true,
    maxLength: 255,
    transform: ["trim"],
    errorMessage: {
        type: "healthStatus debe de ser del tipo texto",
        isNotEmpty: "healthStatus no debe estar vacío",
        maxLength: "healthStatus debe tener como máximo 255 caracteres de longitud"
    }
});

const annotationsDTOSchema = Type.Array(
    Type.String({
        isNotEmpty: true,
        errorMessage: {
            type: "Cada elemento de annotations debe de ser del tipo texto",
            isNotEmpty: "Cada elemento de annotations no debe estar vacío"
        }
    }),
    {
        minItems: 1,
        errorMessage: {
            type: "annotations debe de ser del tipo arreglo",
            minItems: "Proporcione al menos una anotación",
        }
    }
);


module.exports = {
    specialityDTOSchema,
    pacienteDTOSchema,
    healthStatusDTOSchema,
    annotationsDTOSchema
};