const { Router } = require("express");
const AuthService = require("../services/auth");
const { protect } = require("../middlewares/auth");
const validateSchema = require("../middlewares/validateSchema");
const RegisterDTOSchema = require("../dtos/auth/register");
const LoginDTOSchema = require("../dtos/auth/login");
const status = require("http-status");
const { tokenToCookie, deleteCookie } = require("../helpers/authResponse");


function auth(app) {
    const router = Router();
    const authService = new AuthService();

    app.use("/api/auth", router);


    router.post("/register", validateSchema(RegisterDTOSchema), async (req, res) => {
        const result = await authService.register(req.body);

        return res.status(result.success ? status.CREATED : status.BAD_REQUEST).json(result);
    });

    router.post("/login", validateSchema(LoginDTOSchema), async (req, res) => {
        const result = await authService.login(req.body);

        return tokenToCookie(res, result, status.UNAUTHORIZED);
    });

    router.post("/logout", (req, res) => {
        return deleteCookie(res);
    });

    // Protect all routes after this middleware
    router.use(protect);

    router.get("/validate", (req, res) => {
        return res.status(status.OK).json({
            success: true,
            user: req.user
        });
    });
}


module.exports = auth;
