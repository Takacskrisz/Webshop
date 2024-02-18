import React, {useState, useEffect} from 'react';
import app from "../../../firebaseConfig";
import { getDatabase, ref, get, set, push } from "firebase/database";
import "../css/maintenance.css"



function Maintenance({selectedCategory,fetchData}){

    const [nev,setNev]=useState();
    const [ar,setAr]=useState();
    const [mennyiseg,setMennyiseg]=useState();


    const saveData = async () => {

        
        const db = getDatabase(app);
        try{
        const newItemData={
        'Ar':parseInt(ar),
        'Mennyiseg':parseInt(mennyiseg),
        'nev':nev
        }
    
        await set(ref(db, `Kategoriak/${selectedCategory}/${nev}`),newItemData);
    
          alert("Sikeres mentés")
        fetchData(selectedCategory)
       }catch(error) {
          alert("Hiba " + error.message);
       }
      }
    return(
        <div >                      
            <div className="vertical ">
                <div>Kategória: {selectedCategory}</div>
                <div>Termék Név: <input onChange={(e)=>(setNev(e.target.value))}/></div>
                <div>Termék Ár: <input type='number' onChange={(e)=>(setAr(e.target.value))}/></div>
                <div>Termék Mennyiség: <input type='number' onChange={(e)=>(setMennyiseg(e.target.value))}/></div>                
                <div><button onClick={saveData}>Hozzáad</button></div>
            </div>
        </div>
    )

}

export default Maintenance