const { Router } = require("express");
const ObservationService = require("../services/observations");
const { protect, restrictTo } = require("../middlewares/auth");
const status = require("http-status");
const validateSchema = require("../middlewares/validateSchema");

function observations(app) {
    const router = Router();
    const observationService = new ObservationService();

    app.use("/api/observations", router);


    // Protect all routes after this middleware
    router.use(protect);

    router.post("/", restrictTo("MEDICO"), async (req, res) => {
        const result = await observationService.create();

        return res.status(result.success ? status.CREATED : status.BAD_REQUEST).json(result);
    });
}

module.exports = observations;
