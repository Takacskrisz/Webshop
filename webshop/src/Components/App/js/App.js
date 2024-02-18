import React, {useState, useEffect} from 'react';
import Navbar from '../../Navbar/js/navbar';
import Menu from '../../Menu/js/menu';
import Header from '../../Header/js/Header';
import Items from '../../Items/js/items';
import '../css/App.css';


function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (category) => {
      setSelectedCategory(category);
  }

  const [login,setLogin]=useState(false);

  const handleLogin=(loggedin)=>{
    setLogin(loggedin)
  }
  return (
    <div>
    <Menu handleLogin={handleLogin} login={login}/>
    {Header()}
    <Navbar handleSelectCategory={handleSelectCategory} login={login}/>
    <Items selectedCategory={selectedCategory} login={login} />
    <div>
      
    </div>
    </div>
  );
}

export default App;
