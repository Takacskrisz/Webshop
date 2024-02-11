import{ BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Menu from '../../Menu/js/menu';
import Header from '../../Header/js/Header';
import '../css/App.css';

function App() {
  return (
    <div>
    {Menu()}
    {Header()}
    </div>
  );
}

export default App;
