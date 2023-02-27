const mongoose = require('mongoose');

const connectDatabase = (res) => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(con => {
        console.log(`MongoDB is connected to the host: ${con.connection.host} `)
    }).catch(err => {
        console.log(`MongoDB connect issue: ${err.message} `)
    })
}

module.exports = connectDatabase;