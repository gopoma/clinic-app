const ObservationService = require("./observations");
const pug = require("pug");
const pdf = require("html-pdf");
const { response } = require("express");
const status = require("http-status");

class ReportService {
    async generateObservationsPDFReport(idPaciente, res = response) {
        const observationService = new ObservationService();
        const observations = await observationService.getRelatedToPaciente(idPaciente);

        const html = pug.renderFile(`${__dirname}/../views/observations/report.pug`, {
            observations
        });

        const config = {
            "format": "A4",
        };
        pdf.create(html, config).toStream(function(err, stream){
            if(err) {
                console.log(err);
                res.status(status.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    messages: ["Hubo un error al momento de renderizar el PDF. ¡Inténtalo de nuevo más tarde!"]
                });
            } else {
                res.setHeader("Content-Type", "application/pdf");
                stream.pipe(res);
            }
        });
    }
}

module.exports = ReportService;