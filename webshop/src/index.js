//Szüksége modulok beimportálása
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App/js/App';

//Root div megkeresése id alapján
const root = ReactDOM.createRoot(document.getElementById('root'));
//A root div ben rendereljük az App komponenst, amiben minden más komponens megtalálható
root.render(  
    <App />
);


