//Szükséges modulok és komponensek importálása
import React, {useState, useEffect} from 'react';
import Navbar from '../../Navbar/js/navbar';
import Menu from '../../Menu/js/menu';
import Header from '../../Header/js/Header';
import Items from '../../Items/js/items';
import '../css/App.css';
import Background from '../../Items/img/bg.jpg';
import Register from '../../Register/js/register';
import Messages from '../../Messages/js/messages'

/**App komponens, ezen belül hívjuk meg a többi komponenst
 * @returns {ReactNode} React komponensek
 */
function App() {

  //a mode State határozza meg a jelenlegi módot. Módok: "buy","register","messages"
  const [mode,setMode]= useState("buy")
  // A SelectedCategory State tárolja el a kiválasztott kategóriát 
  const [selectedCategory, setSelectedCategory] = useState(null);
  //  A currentUser State tárolja el a jelenlegi felhasználót 
  const [currentUser,setCurrentUser]=useState("Vendég");

  /** HandleCurrenUser egy függvény amit propként használva beállíthatjuk a currentUser értékét más komponensekben
   * @param {string} user felhasználó neve akit be akarunk állítani jelenleginek
   * @returns {state} currentUser
   */
  const handleCurrentUser=(user)=>{
    setCurrentUser(user)
  }

  /** HandleSelectCategory egy függvény amit propként használva beállíthatjuk a selectedCategory értékét más komponensekben
   * @param {string} category kiválasztott kategória neve
   * @returns {state} selectedCategory
   */
  const handleSelectCategory = (category) => {
      setSelectedCategory(category);
  }

  //A login State tárolja el az információt, hogy jelenleg be van-e valaki jelentkezve. Alapesetben false-tehát nincs senki bejelentkezve
  const [login,setLogin]=useState(false);

  /** HandleLogin egy függvény amit propként használva beállíthatjuk login értékét más komponensekben
   * @param {boolean} loggedin bejelentkezés állapota, true vagy false érték
   * @returns {state} login
   */
  const handleLogin=(loggedin)=>{
    setLogin(loggedin)
  }

  useEffect(() => {
    console.log(mode)
}, []);
  /** HandleRegister egy függvény amit propként használva beállíthatjuk a RegisterVisible értékét más komponensekben
   * @param {boolean} isVisible regisztáció komponens láthatóságának értéke, true vagy false
   * @returns {state} registerVisible
   */

  
  /** HandleMode egy függvény amit propként használva beállíthatjuk a mode értékét más komponensekben
   * @param {string} newMode a kiválaszott mode értéke, buy,sell, register, messages
   * @returns {state} mode
   */
  const handleMode=(newMode)=>{
    setMode(newMode)
  }

  //A return alatt szereplő html tagek, a saját komponensekkel együtt mind le lesznek a root div-ben renderelve az App komponensen keresztül
  return (
    <div  style={{ background: `url(${Background})`, backgroundSize: 'cover', minHeight: '100vh' }}>
    <Menu handleLogin={handleLogin} login={login} handleMode={handleMode} mode={mode} currentUser={currentUser} handleCurrentUser={handleCurrentUser}/>
    {Header()}
    {mode=="buy" &&<Navbar handleSelectCategory={handleSelectCategory} login={login} currentUser={currentUser}/>}
    <div>
    {mode=="register" && <Register handleLogin={handleLogin} handleMode={handleMode} handleCurrentUser={handleCurrentUser} />}
    {mode=="buy" &&<Items selectedCategory={selectedCategory} login={login} currentUser={currentUser} mode={mode} handleMode={handleMode} handleSelectCategory={handleSelectCategory}/>}
    {mode=="sell" &&<Items selectedCategory={selectedCategory} login={login} currentUser={currentUser} mode={mode} handleMode={handleMode} handleSelectCategory={handleSelectCategory}/>}
    {mode=="messages"&& <Messages currentUser={currentUser} mode={mode}/>}
    </div>
    </div>
  );
}

// App komponens exportálása
export default App;
