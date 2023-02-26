const ObservationModel = require("../models/observation");
const PacienteService = require("./pacientes");
const handleDBExceptions = require("../helpers/handleDBExceptions");

class ObservationService {
    async create(idMedico, data) {
        const pacienteService = new PacienteService();
        const paciente = await pacienteService.getById(data.paciente);

        if(!paciente) {
            return {
                success: false,
                messages: ["No puedes agregar observaciones médicas a un usuario que no existe"]
            };
        }

        try {
            const observation = await ObservationModel.create({
                ...data,
                medico: idMedico
            });

            return {
                success: true,
                observation
            };
        } catch(error) {
            return handleDBExceptions(error);
        }
    }
}

module.exports = ObservationService;

