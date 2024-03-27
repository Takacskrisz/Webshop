//Szükséges modulok importálása
import React, {useState, useEffect} from 'react';
import app from "../../../firebaseConfig";
import { getDatabase, ref, get, set, push } from "firebase/database";
import "../css/navbar.css"


/** Navbar egy komponens ami a kategóriák közötti navigációt foglalja magába
   * @param {state} login a login state értéke 
   * @param {function} handleSelectCategory kategória kiválasztása
   * @returns {ReactNode} Navbar komponens 
   */
 function Navbar({handleSelectCategory,login}){
    // allItems state az összes Termék kategóriájának eltárolására 
    const [allItems, setAllItems] = useState([]);
    //newCategory state újonnan megadott kategória nevének tárolására
    const [newCategory, setNewCategory]= useState("Hozzáad");
    
    //UseEffect react hook minden stateváltozás-kor meghívja a fetchData() függvényt, frissítve a megjelenített adatokat.
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
      fetchData()
   }catch(error) {
      alert("Hiba " + error.message);
   }
  }



    return(
        <div className="horizontal flex background">
            {allItems.map((item,index)=>(
            <div className='navbar' key={index} onClick={() => handleSelectCategory(item)}>{item}</div>
            ))}
        <div className='navbar'><span  onClick={()=>handleSelectCategory("minden")}>Minden</span></div>
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
//Nabar komponens exportálása
export default Navbar