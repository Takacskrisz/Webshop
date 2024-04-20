const Database = require('./database')
const config = require("../db.json")

module.exports= class Service {

    /**
     * Authentikálja a megadott felhasználót a jelszava ellenében.
     * 
     * @param {String}  uid         felhasználói azonosító
     * @param {String}  password    felhasználó je;lszava
     * @returns {Promise}   promise objektum
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

    /**
     * Hozzáadja az adatbázishoz az új felhasználó adatait
     * 
     * @param {String}  username   felhasználói név
     * @param {String}  password    felhasználó jelszava
     * @param {String}  userid    felhasználó azonosító
     * @param {String}  email    felhasználó email címe
     * @returns {Promise}   promise objektum
     */
    static async register(username, password,userid, email) {

        

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Adatok hozzáadása

        const result = await db.run(`
                        INSERT INTO logindata (Username, PWD, Uid, email)
                        VALUES ('${username}', MD5('${password}'), '${userid}','${email}')
        `)
        
        // Hozzáadás ellenőrzése

        if (result && result.length === 1 && result[0].USERNAME) {
            return true
        } else {
            return false
        }
    }

    /**
     * Ellenőrzi a megadott emailcím létezését az adatbázisban
     * 
     * @param {String}  email   feésználó email címe
     * @returns {Promise}   promise objektum
     */
    static async checkEmail(email) {

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Lekérdezés

        const result = await db.run(`
                        SELECT Username
                        FROM logindata
                        WHERE email = '${email}'
        `)
        
        // Lekérdezés ellenőrzése

        if (result && result.length ===1 ) {
            return true
        } else {
            return false
        }
    }

    /**
     * Ellenőrzi a megadott felhasználó létezését az adatbázisban
     * 
     * @param {String}  username   felhasználó neve
     * @returns {Promise}   promise objektum
     */
    static async checkUsername(username) {

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Lekérdezés

        const result = await db.run(`
                        SELECT Username
                        FROM logindata
                        WHERE Username = '${username}'
        `)
        
        // Lekérdezés ellenőrzése

        if (result && result.length ===1 ) {
            return true
        } else {
            return false
        }
    }
}