const { Router } = require("express");
const UserService = require("../services/users");
const MedicoService = require("../services/medicos");
const { protect, restrictTo } = require("../middlewares/auth");
const status = require("http-status");
const validateSchema = require("../middlewares/validateSchema");
const CreateMedicoDTOSchema = require("../dtos/medicos/create");

function medicos(app) {
    const router = Router();
    const mekdicoService = new MedicoService();

    app.use("/api/medicos", router);


    // Protect all routes after this middleware
    router.use(protect);

    router.post("/", restrictTo("HOSPITAL"), validateSchema(CreateMedicoDTOSchema), async (req, res) => {
        const userService = new UserService();
        const result = await userService.create({
            ...req.body,
            role: "MEDICO",
            hospital: req.user.id
        });

        return res.status(result.success ? status.CREATED : status.BAD_REQUEST).json(result);
    });
}


module.exports = medicos;
