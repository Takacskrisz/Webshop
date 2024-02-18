import React, {useState, useEffect} from 'react';
import app from "../../../firebaseConfig";
import { getDatabase, ref, get, set, push } from "firebase/database";
import "../css/navbar.css"


 function Navbar({handleSelectCategory,login}){

    const [allItems, setAllItems] = useState([]);
    let [newCategory, setNewCategory]= useState("Hozzáad");
    
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

  const saveData = async () => {
    const db = getDatabase(app);
    try{
    const newCategoryData={
    ['item']:true
    }

    await set(ref(db, `Kategoriak/${newCategory}`),newCategoryData);

      alert("Sikeres mentés")
   }catch(error) {
      alert("Hiba " + error.message);
   }
  }



    return(
        <div className="horizontal flex background">
            {allItems.map((item,index)=>(
            <div className='navbar' key={index} onClick={() => handleSelectCategory(item)}>{item}</div>
            ))}

        {login && (
             <div className='horizontal ' > 
                <div > 
                    <input type='text' value={newCategory} onChange={(e)=>{
                    setNewCategory(e.target.value)
                    console.log(newCategory)              
                    }}/>
                </div>
                <div className='newcategory'> 
                    <button className='newcategory' title='Hozzáad' onClick={saveData}>+</button>
                </div>
            </div>)}
        </div>
           
    )
}
export default Navbar