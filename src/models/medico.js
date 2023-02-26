const mongoose = require("mongoose");


const medicoSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuario"
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hospital"
    }
});


const MedicoModel = mongoose.model("medico", medicoSchema);

module.exports = MedicoModel;