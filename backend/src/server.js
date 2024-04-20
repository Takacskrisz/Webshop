// Szükséges modulok betöltése

const express = require('express')
const Service = require('./Service')

/**
 * Indító modul.
 */

console.log('Rendszer indítás')

const app = express()

app.use(express.static('webshop/build'))
const path = require('path');
app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname, 'webshop', 'build', 'index.html'));
});

app.use(express.json())

app.post('/api', async (request, response) => {
    if (request.body.action && request.body.action === 'login') {
        const valid = await Service.login(request.body.uid, request.body.password)

        response.send(valid)
    }
    if (request.body.action && request.body.action === 'register') {
        const valid = await Service.register(request.body.username, request.body.password, request.body.userid, request.body.email)

        response.send(valid)
    }
    if (request.body.action && request.body.action === 'checkE') {
        const valid = await Service.checkEmail(request.body.email)

        response.send(valid)
    }
    if (request.body.action && request.body.action === 'checkU') {
        const valid = await Service.checkUsername(request.body.username)

        response.send(valid)
    }
})


const PORT = 9000

console.log(`WEB -es iszolgáló indítása a ${PORT} -porton`)

app.listen(PORT)