const mongoose = require("mongoose");


const observationSchema = mongoose.Schema({
    hospital: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "hospital"
    },
    medico: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "medico"
    },
    speciality: String,
    paciente: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "paciente"
    },
    healthStatus: String,
    annotations: [String]
});


const ObservationModel = mongoose.model("observation", observationSchema);

module.exports = ObservationModel;
