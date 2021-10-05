require('dotenv').config()

const express = require("express");
const app = express();

const { cacheMiddleware } = require('./lib/cache.js');
const { getEndpoint } = require('./routes/getEndpoint.js')
const { listEndpoint } = require('./routes/listEndpoint.js')
const { statusEndpoint } = require('./routes/statusEndpoint.js')
const { notFound } = require('./routes/notFound.js')

app.get("/", statusEndpoint)
app.get("/:sheet", cacheMiddleware(10), listEndpoint)
app.get("/:sheet/:id", cacheMiddleware(10), getEndpoint)

app.use(notFound)

module.exports = app.listen(process.env.PORT, (port) => console.log(`Server started on http://0.0.0.0:${process.env.PORT}`))