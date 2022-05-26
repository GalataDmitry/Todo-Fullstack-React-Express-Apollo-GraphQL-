const express = require('express')
const cors = require('cors')
require('dotenv').config()
const {graphqlHTTP} = require('express-graphql')
const graphqlSchema = require('./graphqlSchema/graphqlSchema')
const mongooseConnect = require('./connectDB/connectDB')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: graphqlSchema
}))

mongooseConnect()
app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`server run on port ${PORT}`)
})
