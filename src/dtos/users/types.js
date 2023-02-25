const { Type } = require("@sinclair/typebox");


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


module.exports = {
    identificacionDTOSchema,
    emailDTOSchema,
    telefonoDTOSchema,
    passwordDTOSchema,
    roleDTOSchema
};
