const express = require('express');


const app = express()


app.get('/', (req, res) => {
    return res.send('Hello world from SELECTEL')
})


app.get('/test', (req, res) => {
    return res.send(`How was your CF challenge?`)
})


app.listen(80)