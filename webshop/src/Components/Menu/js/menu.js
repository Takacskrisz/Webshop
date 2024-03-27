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
        <div >
            
            <div className="horizontal" style={{backgroundColor:'black'}}>
                <div style={{width:'80%'}} className='horizontal'>
                {login && (
            <>
                <div className='welcome'>Üdvözlünk <span className='user'>{`${currentUser}`}</span></div>
                <div className='menu'><span onClick={()=>handleMode("buy")}>Vásárol</span></div>
                <div className='menu'><span onClick={()=>handleMode("sell")}>Elad</span></div>
                <div className='menu' ><span onClick={()=>handleMode("messages")}>Üzenetek</span></div>
                <div className='menu'>Beállítások</div>
                {console.log(mode)}
            </>
                )}
            </div>
                   
                <div style={{width:'20%'}} className="account">
                    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                    {/* Login értéke szerint változó be-kijelentkezés szöveg, amire kattintva meghívjuk a toggleLoginWindow függvényt*/}
                    <span style={{marginLeft:"20px"}} onClick={(toggleLoginWindow)} >{login ? ("Kijelentkezés"): ("Bejelentkezés")}</span></div>
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