import React, {useState} from 'react';
import "../css/login.css"

function Login({handleLogin, toggleLoginWindow}){

    const [userId,setUserId]=useState()
    const [userPwd,setUserPwd]=useState()
    const ui="admin"
    const pwd="admin"

    function loginAttempt(){

        if(userId===ui && userPwd===pwd){
            handleLogin(true)
            toggleLoginWindow()

        }else{
            handleLogin(false)
            alert("Hibás adatok! "+ui + userId + pwd+userPwd)
        }
    }
    return(

        <div className="vertical loginwindow">
            <div>Felhasználónév: <input className='uid' onChange={(e)=>setUserId(e.target.value)}/></div>
            <div>Jelszó:<input className='pass' type="password" onChange={(e)=>setUserPwd(e.target.value)}/></div>
            <div><button className='loginbutton' onClick={loginAttempt}>Bejelentkezés</button></div>

        </div>
    )
}

export default Login