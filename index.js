const express = require('express');
const redis = require('redis')


const app = express()
const client = redis.createClient()


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


app.get('/', (req, res) => {
    return res.send('Hello world from SELECTEL')
})


app.get('/square/:n', async (req, res) => {
    const number = req.params.n
    const cacheResult = await client.get(number)
    if (cacheResult) {
        return res.send(`[Cache] Answer is ${cacheResult}`)
    }
    await sleep(5000)
    const result = number ** 2
    await client.set(number, result)
    return res.send(`[Calculated] Answer is ${result}`)
})


app.get('/test', (req, res) => {
    return res.send(`How was your CF challenge?`)
})


client.on('error', (e) => {
    console.log(`Failed to launch redis! Exiting. Reason: ${e}`)
    process.exit(0)
})


async function main() {
    await client.connect()
    app.listen(80, () => {
        console.log(`App working...`)
    })
}

main()