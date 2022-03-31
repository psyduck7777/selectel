const express = require('express');


const app = express()


app.get('/', (req, res) => {
    return res.send('Hello world from SELECTEL')
})


app.listen(443)