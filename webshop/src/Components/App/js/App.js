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
  return (
    <div>
    {Menu()}
    {Header()}
    <Navbar handleSelectCategory={handleSelectCategory}/>
    <Items selectedCategory={selectedCategory} />
    <div>
      
    </div>
    </div>
  );
}

export default App;
