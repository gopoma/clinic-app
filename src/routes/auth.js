const { Router } = require("express");
const AuthService = require("../services/auth");
const validateSchema = require("../middlewares/validateSchema");
const RegisterDTOSchema = require("../dtos/auth/register");


function auth(app) {
    const router = Router();
    const authService = new AuthService();

    app.use("/api/auth", router);


    router.post("/register", validateSchema(RegisterDTOSchema), async (req, res) => {
        const result = await authService.register(req.body);

        return res.status(result.success ? 201 : 400).json(result);
    });
}


module.exports = auth;
