const express = require('express')
const routes = require('./routes')

const PORT = process.env.port || 3001
const app = express()

app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})