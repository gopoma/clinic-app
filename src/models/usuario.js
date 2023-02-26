const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { encrypt } = require("../libs/encryption");


const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        pais: String,
        estado: String,
        ciudad: String,
        distrito: String
    },
    identificacion: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    telefono: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ["PACIENTE", "HOSPITAL"],
        default: "PACIENTE"
    },
    isEmailValid: {
        type: Boolean,
        default: false
    },
    emailValidationUUID: String,
    emailValidationUUIDExpiration: Date,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpiration: Date,
}, { timestamps: true });
usuarioSchema.plugin(uniqueValidator, {message: "{VALUE} ya ha sido registrado"});


usuarioSchema.pre("save", async function doPasswordEncryption(next) {
    // Only run this function if password was actually modified
    if(!this.isModified("password")) {
        return next();
    }

    // Hash the password
    this.password = await encrypt(this.password);

    return next();
});


const UsuarioModel = mongoose.model("usuario", usuarioSchema);

module.exports = UsuarioModel;
