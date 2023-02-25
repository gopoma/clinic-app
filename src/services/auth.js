const UserService = require("./users");

class AuthService {
    async register(data) {
        const userService = new UserService();
        const result = await userService.create(data);

        if(!result.success) {
            return {
                success: false,
                messages: result.messages
            };
        }

        return {
            success: true,
            user: result.user
        };
    }
}

module.exports = AuthService;
