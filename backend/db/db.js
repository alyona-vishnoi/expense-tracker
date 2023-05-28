/*This code is defining a function called `db` that connects to a MongoDB database using the Mongoose library. 
The function sets the `strictQuery` option to `false` and then attempts to connect to the database using
the `MONGO_URL` environment variable.
If the connection is successful, it logs a message to the console indicating that the database is connected. 
If there is an error, it logs a message indicating that there was a problem with the database connection.
 Finally, the code exports the `db` function so that it can be used in other parts of the application.*/

const mongoose = require('mongoose'); 

const db = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Db Connected')
    } catch (error) {
        console.log('DB Connection Error');
    }
}

module.exports = {db}