const mongoose = require('mongoose')

const DBurl = process.env.DB_URL

const mongooseConnect = () => {
   return mongoose.connect(DBurl)
        .then(() => console.log('DB connected'))
        .catch(error => console.log(error))
}

module.exports = mongooseConnect
