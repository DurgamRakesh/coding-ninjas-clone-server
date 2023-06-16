const mongoose = require('mongoose');

const ConnectionToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log(`mongoose connected successfully!!! ${mongoose.ConnectionStates.connected}`);
    } catch (error) {
        console.log(error,'error in connecting mongoose');
    }
}

module.exports = ConnectionToDB;

