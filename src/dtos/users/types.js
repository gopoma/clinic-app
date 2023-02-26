const { Type } = require("@sinclair/typebox");


const nombreDTOSchema = Type.String({
    isNotEmpty: true,
    maxLength: 255,
    transform: ["trim"],
    errorMessage: {
        type: "nombre debe de ser del tipo texto",
        isNotEmpty: "nombre no debe estar vacío",
        maxLength: "nombre debe tener como máximo 255 caracteres de longitud"
    }
});

const paisDTOSchema = Type.String({
    isNotEmpty: true,
    maxLength: 255,
    transform: ["trim"],
    errorMessage: {
        type: "pais debe de ser del tipo texto",
        isNotEmpty: "pais no debe estar vacío",
        maxLength: "pais debe tener como máximo 255 caracteres de longitud"
    }
});

const estadoDTOSchema = Type.String({
    isNotEmpty: true,
    maxLength: 255,
    transform: ["trim"],
    errorMessage: {
        type: "estado debe de ser del tipo texto",
        isNotEmpty: "estado no debe estar vacío",
        maxLength: "estado debe tener como máximo 255 caracteres de longitud"
    }
});

const ciudadDTOSchema = Type.String({
    isNotEmpty: true,
    maxLength: 255,
    transform: ["trim"],
    errorMessage: {
        type: "ciudad debe de ser del tipo texto",
        isNotEmpty: "ciudad no debe estar vacío",
        maxLength: "ciudad debe tener como máximo 255 caracteres de longitud"
    }
});

const distritoDTOSchema = Type.String({
    isNotEmpty: true,
    maxLength: 255,
    transform: ["trim"],
    errorMessage: {
        type: "distrito debe de ser del tipo texto",
        isNotEmpty: "distrito no debe estar vacío",
        maxLength: "distrito debe tener como máximo 255 caracteres de longitud"
    }
});

const direccionDTOSchema = Type.Object(
    {
        pais: paisDTOSchema,
        estado: estadoDTOSchema,
        ciudad: ciudadDTOSchema,
        distrito: distritoDTOSchema,
    },
    {
        additionalProperties: false,
        errorMessage: {
            type: "dirección debe de ser del tipo objeto",
            additionalProperties: "No proporciones más propiedades de las necesarias",
            required: {
                pais: "[direccion] Proporcione pais",
                estado: "[direccion] Proporcione estado",
                ciudad: "[direccion] Proporcione ciudad",
                distrito: "[direccion] Proporcione distrito",
            }
        }
    }
);

const identificacionDTOSchema = Type.String({
    format: "identificacion",
    isNotEmpty: true,
    transform: ["trim"],
    errorMessage: {
        type: "identificacion debe de ser del tipo texto",
        format: "El formato de identificación no es válido, debe cumplir la estructura de un DNI peruano",
        isNotEmpty: "identificacion no debe estar vacío"
    }
});

const emailDTOSchema = Type.String({
    format: "email",
    isNotEmpty: true,
    transform: ["trim", "toLowerCase"],
    errorMessage: {
        type: "email debe de ser del tipo texto",
        format: "El formato del email no es válido, debe cumplir el RFC 5321",
        isNotEmpty: "email no debe estar vacío"
    }
});

const telefonoDTOSchema = Type.String({
    format: "telefono",
    isNotEmpty: true,
    transform: ["trim"],
    errorMessage: {
        type: "telefono debe de ser del tipo texto",
        format: "El formato de telefono no es válido, debe cumplir la estructura de un teléfono peruano",
        isNotEmpty: "telefono no debe estar vacío"
    }
});

const passwordDTOSchema = Type.String({
    format: "password",
    minLength: 6,
    errorMessage: {
        type: "password debe de ser del tipo texto",
        format: "El formato de password debe contener una mayúscula, una minúcula y un número",
        minLength: "password debe contener al menos 6 caracteres de longitud"
    }
});

const roleDTOSchema = Type.String({
    isNotEmpty: true,
    enum: ["PACIENTE", "HOSPITAL"],
    errorMessage: {
        type: "role debe de ser del tipo texto",
        isNotEmpty: "role no debe estar vacío",
        enum: "Introduzca un rol válido"
    }
});

const birthdayDTOSchema = Type.String({
    isNotEmpty: true,
    format: "date",
    errorMessage: {
        type: "birthday debe de ser del tipo texto",
        isNotEmpty: "birthday no debe estar vacío",
        format: "El formato del birthday no es válido, debe cumplir el formato YYYY-MM-DD"
    }
});

const servicesDTOSchema = Type.Array(
    Type.String({
        isNotEmpty: true,
        errorMessage: {
            type: "Cada elemento de services debe de ser del tipo texto",
            isNotEmpty: "Cada elemento de services no debe estar vacío"
        }
    }),
    {
        minItems: 1,
        uniqueItems: true,
        errorMessage: {
            type: "services debe de ser del tipo arreglo",
            minItems: "Proporcione al menos un servicio médico",
            uniqueItems: "Los servicios médicos no pueden repetirse"
        }
    }
);


module.exports = {
    // Usuario
    nombreDTOSchema,
    direccionDTOSchema,
    identificacionDTOSchema,
    emailDTOSchema,
    telefonoDTOSchema,
    passwordDTOSchema,
    roleDTOSchema,

    // Paciente
    birthdayDTOSchema,

    // Hospital
    servicesDTOSchema,
};
