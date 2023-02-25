const { Error } = require("mongoose");

function handleDBExceptions(error) {
    if(error instanceof Error.ValidationError) {
        const messages = Object.values(error.errors).map(error => error.message);

        return {
            success: false,
            messages
        };
    } else {
        return {
            succcess: false,
            messages: ["Error no documentado"]
        };
    }
}

module.exports = handleDBExceptions;
