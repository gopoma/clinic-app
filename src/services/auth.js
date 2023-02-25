class AuthService {
    async register(data) {
        return {
            success: true,
            message: "Registering..."
        };
    }
}

module.exports = AuthService;
