const { Router } = require("express");
const AuthService = require("../services/auth");
const validateSchema = require("../middlewares/validateSchema");
const RegisterDTOSchema = require("../dtos/auth/register");
const LoginDTOSchema = require("../dtos/auth/login");


function auth(app) {
    const router = Router();
    const authService = new AuthService();

    app.use("/api/auth", router);


    router.post("/register", validateSchema(RegisterDTOSchema), async (req, res) => {
        const result = await authService.register(req.body);

        return res.status(result.success ? 201 : 400).json(result);
    });

    router.post("/login", validateSchema(LoginDTOSchema), async (req, res) => {
        return res.json({
            success: true,
            message: "Login..."
        });
    });
}


module.exports = auth;
