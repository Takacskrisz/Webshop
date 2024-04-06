//Szükséges modulok importálása
import React,{useState} from 'react';
import "../css/menu.css"
import Login from "../../Login/js/Login";

/** Menu egy komponens ahol a bejelentkezés, kosár és üdvözlő üzenet jelenik meg
   * @param {function} handleLogin a login state beállítása, 
   * @param {state} login a login state jelenlegi értéke
   * @param {function} handleMode a mode state beállítására
   * @param {state} currentUser jelenlegi felhasználó
   * @param {function} handleCurrentUser jelenlegi felhasználó beállítása
   * @returns {ReactNode} Menu komponens 
   */
function Menu({handleLogin, login, handleMode, mode, currentUser, handleCurrentUser}){


    //A loginWindowToggle egy State ami a login ablak megjelenését vizsgálja, alapesetben false, tehát nem látszik
    const [loginWindowToggle, setLoginWindowToggle] = useState(false);

    /**A toggleLoginWindow függvény beállítja a loginWindow state értékét.
     * Amennyiben az true, az értéke false, és fordítva, ezzel ki be kapcsolja a login ablakot
     */
    const toggleLoginWindow=()=>{
        setLoginWindowToggle(!loginWindowToggle)
        //Amennyiben a login értéke true, a toggleLoginWindow függvényt meghívásával login értke false lesz = kijelentkezés
        if(login){
            handleLogin(false)
            setLoginWindowToggle(false)
            handleCurrentUser("Admin")
            handleMode("buy")
        }
    }

    return (
        <div className='tmenu'>
            
            <div className="horizontal " >
                <div className="menus horizontal">
                {login && (
            <>
                    <div className='welcome'>Üdvözlünk <span className='user'>{`${currentUser}`}</span></div>
                    <div className='menu' onClick={()=>handleMode("buy")}>Vásárol</div>
                    <div className='menu' onClick={()=>handleMode("sell")}>Elad</div>
                    <div className='menu'  onClick={()=>handleMode("messages")}>Üzenetek</div>
                    {console.log(mode)}
            </>
                )}
                    
                </div>
                <div  className="account flex">
                    {/* Login értéke szerint változó be-kijelentkezés szöveg, amire kattintva meghívjuk a toggleLoginWindow függvényt*/}
                    <span style={{marginLeft:"20px"}} onClick={(toggleLoginWindow)} >{login ? ("Kijelentkezés"): ("Bejelentkezés")}</span>
                </div>
                   
                
            </div>
            {/* Amennyiben a loginWindowToggle értéke true, megjelenítjük a Login komponenst*/}
            {loginWindowToggle && (
                <div className='overlay'>
                    {/* Login komponens, bejelentkező ablak, amiben meg kell adni a felhasználó nevet és jelszót, és meg lehet nyitni benne a regisztációt */}
                    <Login handleLogin={handleLogin} toggleLoginWindow={toggleLoginWindow} handleMode={handleMode} handleCurrentUser={handleCurrentUser}/>
                </div>
            )}
            
        </div>
    )
}
//Menu komponens exportálása
export default Menu;