const { Router } = require("express");
const ReportService = require("../services/reports");
const { protect, restrictTo } = require("../middlewares/auth");

function pacientes(app) {
    const router = Router();

    app.use("/api/pacientes", router);

    // Protect all routes after this middleware
    router.use(protect);

    router.get("/observations/pdf", restrictTo("PACIENTE"), async (req, res) => {
        const reportService = new ReportService();

        return reportService.generateObservationsPDFReport(req.user.id, res);
    });
}

module.exports = pacientes;