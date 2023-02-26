const { Type } = require("@sinclair/typebox");
const {
    specialityDTOSchema,
    pacienteDTOSchema,
    healthStatusDTOSchema,
    annotationsDTOSchema
} = require("../observations/types");

const CreateObservationDTOSchema = Type.Object(
    {
        speciality: specialityDTOSchema,
        paciente: pacienteDTOSchema,
        healthStatus: healthStatusDTOSchema,
        annotations: annotationsDTOSchema
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: "No proporciones más propiedades de las necesarias",
            required: {
                speciality: "Proporcione speciality",
                paciente: "Proporcione paciente",
                healthStatus: "Proporcione healthStatus",
                annotations: "Proporcione annotations",
            }
        }
    }
);

module.exports = CreateObservationDTOSchema;