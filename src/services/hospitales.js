const HospitalModel = require("../models/hospital");

class HospitalService {
    async create(data) {
        const hospital = await HospitalModel.create(data);

        return hospital;
    }

    async getByMedico(idMedico) {
        const hospital = await HospitalModel.findOne({ medico: idMedico });

        return hospital;
    }
}

module.exports = HospitalService;
