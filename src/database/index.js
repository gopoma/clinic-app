const mongoose = require("mongoose");
const { dbCNN } = require("../config");

async function doDBConnection() {
    try {
        mongoose.set("strictQuery", true);
        const conn = await mongoose.connect(dbCNN);

        // eslint-disable-next-line
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch(error) {
        // eslint-disable-next-line
        console.log(error);

        throw new Error("Error when initializing DB");
    }
}

module.exports = doDBConnection;
