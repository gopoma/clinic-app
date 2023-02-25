const { addDays } = require("date-fns");
const { response } = require("express");
const { production } = require("../config");
const status = require("http-status");


function tokenToCookie(res = response, result, errCode) {
    if(!result.success) {
        return res.status(errCode).json(result);
    }

    const { token, ...data } = result;

    return res.cookie("token", token, {
        httpOnly: true,
        secure: production,
        sameSite: "none",
        expires: addDays(new Date(), 7)
    }).status(status.ACCEPTED).json(data);
}

function deleteCookie(res = response) {
    return res.cookie("token", "", {
        httpOnly: true,
        secure: production,
        sameSite: "none",
        expires: new Date()
    }).status(status.ACCEPTED).json({
        success: true,
        message: "Sesión cerrada exitosamente"
    });
}


module.exports = {
    tokenToCookie,
    deleteCookie
};
