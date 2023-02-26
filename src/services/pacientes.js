const PacienteModel = require("../models/paciente");

class PacienteService {
    async create(data) {
        const paciente = await PacienteModel.create(data);

        return paciente;
    }

    async getById(idPaciente) {
        const paciente = await PacienteModel.findById(idPaciente);

        return paciente;
    }
}

module.exports = PacienteService;
