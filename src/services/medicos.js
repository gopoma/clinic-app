const MedicoModel = require("../models/medico");

class MedicoService {
    async create() {
        return {
            success: true,
            message: "In creating process..."
        };
    }
}

module.exports = MedicoService;