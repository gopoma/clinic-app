require("dotenv").config();

const config = {
    backendURL: process.env.BACKEND_URL,
    backendURLDev: process.env.BACKEND_URL_DEVELOPMENT,
    dbCNN: process.env.DB_CNN,
    development: process.env.NODE_ENV === "development",
    emailHost: process.env.EMAIL_HOST,
    emailPort: process.env.EMAIL_PORT,
    emailSecure: process.env.EMAIL_SECURE === "true",
    emailUser: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASSWORD,
    emailFrom: process.env.EMAIL_FROM,
    jwtSecret: process.env.JWT_SECRET,
    production: process.env.NODE_ENV === "production",
    port: process.env.PORT || "4000",
};

module.exports = config;
