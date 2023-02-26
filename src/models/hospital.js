const mongoose = require("mongoose");


const hospitalSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuario"
    },
    services: {
        type: [String],
        set: (arr) => [...new Set(arr)]
    },
});


const HospitalModel = mongoose.model("hospital", hospitalSchema);

module.exports = HospitalModel;
