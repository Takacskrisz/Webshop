import React, {useState} from 'react';

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

        <div className="vertical">
            <div>Felhasználónév: <input onChange={(e)=>setUserId(e.target.value)}/></div>
            <div>Jelszó:<input type="password" onChange={(e)=>setUserPwd(e.target.value)}/></div>
            <div><button onClick={loginAttempt}>Bejelentkezés</button></div>

        </div>
    )
}

export default Login