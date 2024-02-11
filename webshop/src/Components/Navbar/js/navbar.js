import React, {useState, useEffect} from 'react';
import app from "../../../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import "../css/navbar.css"


 function Navbar(){


    useEffect(()=>{
        fetchData()
        console.log(allItems)
    },[])
    
    const [allItems, setAllItems] = useState([]);

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
            <div className='navbar' key={index}>{item}</div>
            ))}

        </div>
    )
}
export default Navbar