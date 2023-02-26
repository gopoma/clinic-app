const ObservationModel = require("../models/observation");
const PacienteService = require("./pacientes");
const HospitalService = require("./hospitales");
const handleDBExceptions = require("../helpers/handleDBExceptions");

const populationOptions = [
    {
        path: "hospital",
        model: "hospital",
        select: "services",
        populate: {
            path: "_id",
            model: "usuario",
            select: "nombre direccion"
        }
    },
    {
        path: "medico",
        model: "medico",
        select: "-hospital",
        populate: {
            path: "_id",
            model: "usuario",
            select: "nombre"
        }
    }
];

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

        const hospitalService = new HospitalService();
        const hospital = await hospitalService.getByMedico(idMedico);

        try {
            const observation = await ObservationModel.create({
                ...data,
                hospital: hospital.id,
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

    async getRelated(role, id) {
        let observations;
        switch(role) {
            case "PACIENTE": {
                observations = await this.#getRelatedToPaciente(id);
                break;
            }
            case "MEDICO": {
                observations = await this.#getRelatedToMedico(id);
                break;
            }
            case "HOSPITAL": {
                observations = await this.#getRelatedToHospital(id);
                break;
            }
            default:
        }

        return {
            success: true,
            observations
        };
    }

    async #getRelatedToPaciente(idPaciente) {
        const observations = await ObservationModel.find({ paciente: idPaciente }).populate(populationOptions);

        return observations;
    }

    async #getRelatedToMedico(idMedico) {
        const observations = await ObservationModel.find({ medico: idMedico }).populate(populationOptions);

        return observations;
    }

    async #getRelatedToHospital(idHospital) {
        const observations = await ObservationModel.find({ hospital: idHospital }).populate(populationOptions);

        return observations;
    }
}

module.exports = ObservationService;

