const MedicoModel = require("../models/medico");

class MedicoService {
    async create(data) {
        const medico = await MedicoModel.create(data);

        return medico;
    }
}

module.exports = MedicoService;