const PacienteModel = require("../models/paciente");

class PacienteService {
    async create(data) {
        const paciente = await PacienteModel.create(data);

        return paciente;
    }
}

module.exports = PacienteService;
