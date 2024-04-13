//szükséges modulok importálása
import { useState,useEffect } from "react"
import {v4} from "uuid";
import "../css/register.css" 

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
    //buttonEnabled state figyeli hogy a regisztráló gomb be van-e kapcsolva, alaphelyzetben false
    const [buttonEnabled,setButtonEnabled]=useState(false);

    //useEffect react hook figyeli a newUserName változását, és a változott newUserName alapján létrehoz egy newUserId-t
    useEffect(() => {
        setNewUserId(`${newUserName}${v4()}`)
    }, [newUserName]);

    
    function checkEmail(){

        // Promise objektum visszaadása
  
        return new Promise((resolve, reject) => {
              
            // Adatok előkészítése

            const data = JSON.stringify({ 
                action:         'checkE', 
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
                if(data){
                    alert("Ez az emai-cím már regisztrálva van, adjon meg másikat vagy jelentkezzen be.")
                    return false
                } else return true
               
                
            }).catch((error) => {

                // Hiba történt

                reject(error)
                console.log(error)
            })
        }) 
    }
    /**registerAttempt függvény elköldi az új felhasználó adatait az adatbázisba */
    async function registerAttempt(){

        if(! await checkEmail()){

        
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
        
}

    function checkInputs(){
        if (newUserName !=='' && newEmail!=='' && newPassword!==''){
            setButtonEnabled(true);
            console.log(newEmail,newUserName,newPassword)
          } else {
            setButtonEnabled(false);
            console.log(newEmail,newUserName,newPassword)
          }
    }

    useEffect(() => {
        checkInputs();
      }, [newUserName, newEmail, newPassword]);
    

            return(
                <div className="regPage">
                    <div className="selectedCat">REGISZTRÁCIÓ</div>
                    <div><input placeholder="Felhasználónév"
                                value={newUserName}
                                onInput={(e)=>{setNewUserName(e.target.value)}}/>
                    </div>
                    <div><input placeholder="Email"
                                value={newEmail}
                                onInput={(e)=>{setNewEmail(e.target.value)}}/>           
                    </div>
                    <div><input placeholder="Jelszó"
                                value={newPassword}
                                type="password"
                                onInput={(e)=>{setNewPassword(e.target.value)}}/>
                    </div>
                    <div><button className="addbuttonI regbutton" disabled={!buttonEnabled} onClick={registerAttempt}>Regisztráció</button></div>
                    <div><button className="addbuttonI" onClick={()=>{handleMode("buy")}}>Mégsem</button></div>
                    
                </div>
            )
}

//Register komponens exportálása
export default Register