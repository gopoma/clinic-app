const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const status = require("http-status");
const { response } = require("express");


function protect(req, res = response, next) {
    const { token } = req.cookies;

    if(!token) {
        return res.status(status.FORBIDDEN).json({
            success: false,
            messages: ["Es necesario un token para realizar este proceso"]
        });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        delete decoded.iat;
        delete decoded.exp;
        req.user = decoded;
    } catch(error) {
        return res.status(status.FORBIDDEN).json({
            success: false,
            messages: ["Es necesario un token válido para realizar este proceso"]
        });
    }

    return next();
}

function restrictTo(...roles) {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(status.FORBIDDEN).json({
                success: false,
                messages: ["Permisos insuficientes"]
            });
        }

        return next();
    };
}


module.exports = {
    protect,
    restrictTo
};
