import React, {useState} from 'react';
import "../css/login.css"

function Login({handleLogin, toggleLoginWindow, handleRegister}){

    const [userId,setUserId]=useState()
    const [userPwd,setUserPwd]=useState()


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

export default Login