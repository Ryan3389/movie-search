const express = require('express')
const routes = require('./routes')
const path = require('path')
const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(routes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})