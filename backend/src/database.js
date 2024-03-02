/**
 * MySQL adatbázis kommunikációt biztosítja.
 */

// Szükséges modulok betöltése

const mysql = require('mysql2')

module.exports = class Database {

    // Adatbázis gépnév vagy IP
    #host

    // Adatbázis port
    #port

    // Felhasználó neve
    #user

    // Felhasználó jelszava
    #password

    // Adatbázis neve
    #dbname

    /**
     * Létrehoz egy új Database objektumot a megadott paraméterekkel.
     * 
     * @param {String} host         adatbázis gépnév vagy IP
     * @param {String} port         adatbázis port
     * @param {String} user         felhasználó neve
     * @param {String} password     felhasználó jelszava
     * @param {String} dbname       adatbázis neve
     */

    constructor(host, port, user, password, dbname) {
        this.#host = host
        this.#port = port
        this.#user = user
        this.#password = password
        this.#dbname = dbname
    }

    /**
     * Visszaadja az adatbázis gépnevet vagy IP -t.
     */

    get host() {
        return this.#host
    }

    /**
     * Beállítja az adatbázis gépnevet vagy IP -t.
     */

    set host(host) {
        this.#host = host
    }

    /**
     * Visszaadja az adatbázis portot.
     */

    get port() {
        return this.#port
    }

    /**
     * Beállítja az adatbázis portot.
     */

    set port(port) {
        this.#port = port
    }

    /**
     * Visszaadja a felhasználó nevet.
     */

    get user() {
        return this.#user
    }

    /**
     * Beállítja a felhasználó nevet.
     */

    set user(user) {
        this.#user = user
    }

    /**
     * Visszaadja a felhasználó jelszavát.
     */

    get password() {
        return this.#password
    }

    /**
     * Beállítja a felhasználó jelszavát.
     */

    set password(password) {
        this.#password = password
    }

    /**
     * Visszaadja az adatbázis nevét.
     */

    get dbname() {
        return this.#dbname
    }

    /**
     * Beállítja az adatbázis nevét.
     */

    set dbname(dbname) {
        this.#dbname = dbname
    }

    /**
     * Lefuttatja a paraméterül kapott SQL parancssorozatot és visszaadja a
     * futás eredményét.
     * 
     * @param   {String}    sql     SQL parancssorozat
     * @returns {Promise}   promise promise objektum
     */

    run(sql) {

        // Promise objektum visszaadása

        return new Promise((resolve, reject) => {

            // Kapcsolat definiálása

            const con = mysql.createConnection({
                host:       this.#host,
                port:       this.#port,
                user:       this.#user,
                password:   this.#password,
                database:   this.#dbname
            })

            // Kapcsolat kiépítése

            con.connect((error) => {

                // Volt hiba?

                if (error) {
                    reject(error)
                } else {

                    // SQL parancssorozat futtatása

                    con.query(sql, (error, result) => {

                        // Volt hiba?

                        if (error) {
                            reject(error)
                        } else { 

                            // Eredmény visszaadása

                            resolve(result)
                        }

                        // Kapcsolat lezárása
                        
                        con.end()
                    })
                }
            })
        })
    }
}