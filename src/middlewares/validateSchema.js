const { ajv } = require("../libs/validation");
const { response } = require("express");


function processErrors(errors) {
    return errors.map(error => error?.message || "Error no documentado");
}

function validateSchema(schema, target = "body") {
    return (req, res = response, next) => {
        const validate = ajv.compile(schema);

        let requestTarget;
        switch(target) {
            case "body":
                requestTarget = req.body;
                break;
            case "params":
                requestTarget = req.params;
                break;
            default:
                throw new Error("introduced target is not valid!");
        }

        const isSchemaValid = validate(requestTarget);
        if(!isSchemaValid) {
            return res.status(400).json({
                success: false,
                messages: processErrors(validate.errors)
            });
        }


        return next();
    };
}


module.exports = validateSchema;
