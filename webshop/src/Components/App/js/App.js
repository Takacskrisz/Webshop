//Szükséges modulok és komponensek importálása
import React, {useState, useEffect} from 'react';
import Navbar from '../../Navbar/js/navbar';
import Menu from '../../Menu/js/menu';
import Header from '../../Header/js/Header';
import Items from '../../Items/js/items';
import '../css/App.css';
import Background from '../../Items/img/bg.jpg';
import Register from '../../Register/js/register';
import Chat from '../../Chat/js/chat';

/**App komponens, ezen belül hívjuk meg a többi komponenst
 * @returns {ReactNode} React komponensek
 */
function App() {

  
  // A SelectedCategory State tárolja el a kiválasztott kategóriát 
  const [selectedCategory, setSelectedCategory] = useState(null);
  //  A currentUser State tárolja el a jelenlegi felhasználót 
  const [currentUser,setCurrentUser]=useState("Admin");

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
  //A registerVisible egy State, ami azt figyeli a regisztráló komponensnek látszódnia kell-e, alapesetben false, tehát nem
  const [registerVisible,setRegisterVisible]=useState(false)

  /** HandleRegister egy függvény amit propként használva beállíthatjuk a RegisterVisible értékét más komponensekben
   * @param {boolean} isVisible regisztáció komponens láthatóságának értéke, true vagy false
   * @returns {state} registerVisible
   */
  const handleRegister=(isVisible)=>{
    setRegisterVisible(isVisible)
  }
  
  //A return alatt szereplő html tagek, a saját komponensekkel együtt mind le lesznek a root div-ben renderelve az App komponensen keresztül
  return (
    <div  style={{ background: `url(${Background})`, backgroundSize: 'cover', minHeight: '100vh' }}>
    <Menu handleLogin={handleLogin} login={login} handleRegister={handleRegister} currentUser={currentUser} handleCurrentUser={handleCurrentUser}/>
    {Header()}
    <Navbar handleSelectCategory={handleSelectCategory} login={login}/>
    <div>
    {registerVisible && <Register handleLogin={handleLogin} handleRegister={handleRegister} handleCurrentUser={handleCurrentUser} />}
    <Items selectedCategory={selectedCategory} login={login} currentUser={currentUser}/>
    <Chat  currentUser={currentUser}/>
    </div>
    </div>
  );
}

// App komponens exportálása
export default App;
