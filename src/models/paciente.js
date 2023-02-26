const mongoose = require("mongoose");


const pacienteSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuario"
    },
    birthday: Date
});


const PacienteModel = mongoose.model("paciente", pacienteSchema);

module.exports = PacienteModel;
