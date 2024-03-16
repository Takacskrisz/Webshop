//szükséges modulok importálása
import { useState,useEffect } from "react"
import {v4} from "uuid";

/** Register egy komponens ami a regisztációt foglalja magában
   * @param {function} handleLogin a login state beállítása, 
   * @param {function} handleMode a mode state beállítása
   * @param {function} handleCurrentUser jelenlegi felhasználó beállítása
   * @returns {ReactNode} Register komponens 
   */
function Register({handleLogin,handleMode,handleCurrentUser}){

    //newUserName state a megadott új felhasználó nevet tárolja el
    const [newUserName,setNewUserName]=useState("");
    //newPassword state a megadott új jelszót tárolja el
    const [newPassword,setNewPassword]=useState("");
    //newUserId state az új felhasználó azonosítóját tárolja el
    const [newUserId,setNewUserId]=useState("");
    //newEmail state az új felhasználó email címét tárolja el
    const [newEmail,setNewEmail]=useState("");

    //useEffect react hook figyeli a newUserName változását, és a változott newUserName alapján létrehoz egy newUserId-t
    useEffect(() => {
        setNewUserId(`${newUserName}${v4()}`)
    }, [newUserName]);

    /**registerAttempt függvény elköldi az új felhasználó adatait az adatbázisba */
    function registerAttempt(){


        
        // Promise objektum visszaadása
  
          return new Promise((resolve, reject) => {
              
              // Adatok előkészítése
  
              const data = JSON.stringify({ 
                  action:         'register', 
                  username:       newUserName,
                  password:       newPassword,
                  userid:         newUserId,
                  email:          newEmail
              })
          
              // POST kérés elküldése
  
              fetch('/api', { 
                  method: 'POST',
                  headers: { 
                      'Content-Type': 'application/json; charset=utf-8',
                      'Content-Length': data.length
                  },
                  body: data
              }).then(response => response.json()).then((data) => {
  
                  // Eredmény visszaadása
  
                  resolve(data)
                  alert("Sikeres Regsztáció")
                  handleCurrentUser(newUserName)
                  handleLogin(true)
                  handleMode("buy")
                  
              }).catch((error) => {
  
                  // Hiba történt
  
                  reject(error)
              })
          }) 
        
}
            return(
                <div>
                    <div>Felhasználónév:<input onChange={(e)=>setNewUserName(e.target.value)}/></div>
                    <div>Jelszó:<input type="password" onChange={(e)=>setNewPassword(e.target.value)}/></div>
                    <div>Email:<input onChange={(e)=>setNewEmail(e.target.value)}/></div>
                    <button onClick={registerAttempt}>Regisztráció</button>
                    
                </div>
            )
}

//Register komponens exportálása
export default Register