const { Router } = require("express");
const AuthService = require("../services/auth");


function auth(app) {
    const router = Router();
    const authService = new AuthService();

    app.use("/api/auth", router);


    router.post("/register", async (req, res) => {
        const result = await authService.register(req.body);

        return res.status(result.success ? 201 : 400).json(result);
    });
}

module.exports = auth;
