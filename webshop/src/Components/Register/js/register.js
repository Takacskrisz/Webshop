import { useState } from "react"
import {v4} from "uuid";


function Register(handleLogin,handleRegister){

    const [newUserName,setNewUserName]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [newUserId,setNewUserId]=useState("");

    function registerAttempt(){


        setNewUserId(`${newUserName}${v4()}`)
        // Promise objektum visszaadása
  
          return new Promise((resolve, reject) => {
              
              // Adatok előkészítése
  
              const data = JSON.stringify({ 
                  action:         'register', 
                  username:       newUserName,
                  password:       newPassword,
                  userid:         newUserId
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
                  handleRegister(false)
                  console.log(handleRegister)
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
                    <button onClick={registerAttempt}>Regisztráció</button>
                    
                </div>
            )
}

export default Register