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

  const handleSelectCategory = (category) => {
      setSelectedCategory(category);
  }

  const [login,setLogin]=useState(false);

  const handleLogin=(loggedin)=>{
    setLogin(loggedin)
  }
  const [register,setRegister]=useState(false)


  const handleRegister=(reg)=>{
    setRegister(reg)
  }
  useEffect(() => {
    console.log(handleRegister)
  }, []);
  return (
    <div  style={{background: `url(${Background})`}}>
    <Menu handleLogin={handleLogin} login={login} handleRegister={handleRegister}/>
    {Header()}
    <Navbar handleSelectCategory={handleSelectCategory} login={login}/>
    <div>
    {register &&(<Register handleLogin={handleLogin} handleRegister={handleRegister}/>)}
    <Items selectedCategory={selectedCategory} login={login} />
   
    </div>
    </div>
  );
}

export default App;
