require("dotenv").config();

const config = {
    dbCNN: process.env.DB_CNN,
    development: process.env.NODE_ENV === "development",
    jwtSecret: process.env.JWT_SECRET,
    production: process.env.NODE_ENV === "production",
    port: process.env.PORT || "4000",
};

module.exports = config;
