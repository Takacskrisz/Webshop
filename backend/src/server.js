// Szükséges modulok betöltése
const Database = require('./database')
const express = require('express')
const config = require("../db.json")
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
})

class Service {

    /**
     * Authentikálja a megadott felhasználót a jelszava ellenében.
     * 
     * @param {String}  uid         felhasználói azonosító
     * @param {String}  password    felhasználó je;lszava
     * @returns {Promise}   promise promise objektum
     */

    static async login(uid, password) {

        console.log(`Felhasználó authentikációja: ${uid}`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Authentikáció

        const result = await db.run(`SELECT   USERNAME
                        FROM    logindata
                        WHERE   Username = "${uid}"
                                AND PWD = MD5("${password}")
                                `)
        
        // Authentikáció sikerességének ellenőrzése

        if (result && result.length === 1 && result[0].USERNAME) {
            return true
        } else {
            return false
        }
    }
}
const PORT = 9000

console.log(`WEB -es iszolgáló indítása a ${PORT} -porton`)

app.listen(PORT)
