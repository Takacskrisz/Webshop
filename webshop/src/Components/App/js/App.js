import Navbar from '../../Navbar/js/navbar';
import Menu from '../../Menu/js/menu';
import Header from '../../Header/js/Header';
import '../css/App.css';


function App() {

  return (
    <div>
    {Menu()}
    {Header()}
    {Navbar()}
    <div>
      
    </div>
    </div>
  );
}

export default App;
