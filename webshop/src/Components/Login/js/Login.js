//Szükséges modulok importálása
import React, {useState} from 'react';
import "../css/login.css"

/** Login egy komponens ami a bejelentkezőablakot foglalja magában
   * @param {function} handleLogin a login state beállítása, 
   * @param {function} toggleLoginWindow A login ablak megjelenítését állítja be, true vagy false
   * @param {function} handleRegister a regisztáció komponens megjelenésének állapota true vagy falseD
   * @param {function} handleCurrentUser jelenlegi felhasználó beállítása
   * @returns {ReactNode} Login komponens 
   */
function Login({handleLogin, toggleLoginWindow, handleRegister, handleCurrentUser}){

    //userId state a beírt felhasználónevet tárolja
    const [userId,setUserId]=useState()
    //userPwd state a beírt jelszót tárojla
    const [userPwd,setUserPwd]=useState()

    /** loginAttempt függvény ellenőrzi a megadott adatokat
     * @returns Promise 
     */
    function loginAttempt(){

          // Promise objektum visszaadása
    
            return new Promise((resolve, reject) => {
                
                // Adatok előkészítése
    
                const data = JSON.stringify({ 
                    action:         'login', 
                    uid:            userId,
                    password:       userPwd
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
                    if(data){
                        handleCurrentUser(userId)
                        handleLogin(true)
                        toggleLoginWindow()
                    }else{
                        handleLogin(false)
                        alert("Hibás adatok! "+ userId + userPwd)
                    }
                    
                }).catch((error) => {
    
                    // Hiba történt
    
                    reject(error)
                })
            }) 
}
    return(

        <div className="vertical loginwindow">
            <div>Felhasználónév: <input className='uid' onChange={(e)=>setUserId(e.target.value)}/></div>
            <div>Jelszó:<input className='pass' type="password" onChange={(e)=>setUserPwd(e.target.value)}/></div>
            <div><button className='loginbutton' onClick={loginAttempt}>Bejelentkezés</button></div>
            <div><button className='loginbutton'onClick={()=>{handleRegister(true); toggleLoginWindow()}} >Regisztáció</button></div>

        </div>
    )
}

//Login komponens exportálása
export default Login