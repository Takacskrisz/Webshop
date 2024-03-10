import React, {useState, useEffect} from 'react';
import Navbar from '../../Navbar/js/navbar';
import Menu from '../../Menu/js/menu';
import Header from '../../Header/js/Header';
import Items from '../../Items/js/items';
import '../css/App.css';
import Background from '../../Items/img/bg.jpg';
import Register from '../../Register/js/register';


function App() {

  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentUser,setCurrentUser]=useState();

  const handleCurrentUser=(user)=>{
    setCurrentUser(user)
  }

  const handleSelectCategory = (category) => {
      setSelectedCategory(category);
  }

  const [login,setLogin]=useState(false);

  const handleLogin=(loggedin)=>{
    setLogin(loggedin)
  }
  const [registerVisible,setRegisterVisible]=useState(false)


  const handleRegister=(isVisible)=>{
    setRegisterVisible(isVisible)
  }
  useEffect(() => {
    console.log(handleRegister)
  }, []);
  return (
    <div  style={{ background: `url(${Background})`, backgroundSize: 'cover', minHeight: '100vh' }}>
    <Menu handleLogin={handleLogin} login={login} handleRegister={handleRegister} currentUser={currentUser} handleCurrentUser={handleCurrentUser}/>
    {Header()}
    <Navbar handleSelectCategory={handleSelectCategory} login={login}/>
    <div>
    {registerVisible && <Register handleLogin={handleLogin} handleRegister={handleRegister} handleCurrentUser={handleCurrentUser} />}
    <Items selectedCategory={selectedCategory} login={login} />
   
    </div>
    </div>
  );
}

export default App;
