const { Router } = require("express");
const MedicoService = require("../services/medicos");
const { protect, restrictTo } = require("../middlewares/auth");
const status = require("http-status");


function medicos(app) {
    const router = Router();
    const medicoService = new MedicoService();

    app.use("/api/medicos", router);


    // Protect all routes after this middleware
    router.use(protect);

    router.post("/", restrictTo("HOSPITAL"), async (req, res) => {
        const result = await medicoService.create(req.body);

        return res.status(result.success ? status.CREATED : status.BAD_REQUEST).json(result);
    });
}


module.exports = medicos;
