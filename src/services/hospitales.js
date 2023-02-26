const HospitalModel = require("../models/hospital");

class HospitalService {
    async create(data) {
        const hospital = await HospitalModel.create(data);

        return hospital;
    }
}

module.exports = HospitalService;
