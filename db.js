const mongose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './.env' });


const DB_connection = async () => {
    try {
        await mongose.connect(process.env.MONGO_URI)
        .then
        console.log("DB connected Succesfully");

    } catch (error) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports={DB_connection}