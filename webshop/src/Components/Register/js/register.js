import { useState,useEffect } from "react"
import {v4} from "uuid";


function Register({handleLogin,handleRegister,handleCurrentUser}){

    const [newUserName,setNewUserName]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [newUserId,setNewUserId]=useState("");
    const [newEmail,setNewEmail]=useState("");

    useEffect(() => {
        setNewUserId(`${newUserName}${v4()}`)
    }, [newUserName]);

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
                  alert("Valami!!!")
                  handleRegister(false)
                  handleCurrentUser(newUserName)
                  handleLogin(true)
                  
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

export default Register