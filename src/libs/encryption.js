const bcrypt = require("bcrypt");
const { saltRounds } = require("../constants");


async function encrypt(str) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(str, salt);

    return hash;
}

async function compare(str, hash) {
    return bcrypt.compare(str, hash);
}

module.exports = {
    encrypt,
    compare
};
