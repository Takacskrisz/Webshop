import React, {useState, useEffect} from 'react';
import app from "../../../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import "../css/navbar.css"


 function Navbar({handleSelectCategory}){

    const [allItems, setAllItems] = useState([]);
    
    useEffect(()=>{
        fetchData()
        console.log(allItems)
    },[])
    
    const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "Kategoriak");
    const snapshot = await get(dbRef);
    
    if(snapshot.exists()) {
        const data = snapshot.val();
        const kategorias = Object.keys(data); 
        console.log(kategorias); 
        setAllItems(kategorias);
    } else {
      console.log("error");
    }
  }
  
    return(
        <div className="horizontal flex background">
            {allItems.map((item,index)=>(
            <div className='navbar' key={index} onClick={() => handleSelectCategory(item)}>{item}</div>
            ))}

        </div>
    )
}
export default Navbar