const Database = require('./database')
const config = require("../db.json")

module.exports= class Service {

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
    static async register(username, password,userid, email) {

        

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Authentikáció

        const result = await db.run(`
                        INSERT INTO logindata (Username, PWD, Uid, email)
                        VALUES ('${username}', MD5('${password}'), '${userid}','${email}')
        `)
        
        // Authentikáció sikerességének ellenőrzése

        if (result && result.length === 1 && result[0].USERNAME) {
            return true
        } else {
            return false
        }
    }
}