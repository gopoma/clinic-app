const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const addErrors = require("ajv-errors");
const addKeywords = require("ajv-keywords");


function validateNotEmpty(cxt) {
    const { data, schema } = cxt;
    if (schema) {
        cxt.fail(Ajv._`${data}.trim() === ''`);
    }
}

const ajv = new Ajv({ allErrors: true })
    .addKeyword("kind")
    .addKeyword("modifier")
    .addKeyword({
        keyword: "isNotEmpty",
        schemaType: "boolean",
        type: "string",
        code: validateNotEmpty,
        error: { message: "string field must be non-empty" }
    });


addFormats(ajv, ["date", "email", "uri"])
    .addFormat("identificacion", /^[0-9]{8}$/)
    .addFormat("telefono", /^[0-9]{9}$/)
    .addFormat("password", /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);


addErrors(ajv);
addKeywords(ajv, ["transform"]);

module.exports = {
    validateNotEmpty,
    ajv
};
