import React, {useState, useEffect} from 'react';
import app from "../../../firebaseConfig";
import { getDatabase, ref, get, set, push } from "firebase/database";
import "../css/maintenance.css"



function Maintenance({selectedCategory,fetchData,product,handleEditItem,editItem}){

    const [nev,setNev]=useState("");
    const [ar,setAr]=useState("");
    const [mennyiseg,setMennyiseg]=useState("");

    useEffect(() => {
        if (product) {
            setNev(product.nev || "");
            setAr(parseInt(product.Ar) || "");
            setMennyiseg(product.Mennyiseg || "");
        }
    }, [product]);
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
        handleEditItem(false)
       }catch(error) {
          alert("Hiba " + error.message);
       }
      }
    return(
        <div  >                      
            <div className="vertical main " >
                <div>Kategória: {selectedCategory}</div>
                <div><label>Termék Név:</label> <input onChange={(e)=>(setNev(e.target.value))} value={nev}/></div>
                <div><label>Termék Ár:</label> <input type='number' onChange={(e)=>(setAr(e.target.value))} value={ar}/></div>
                <div><label>Termék Mennyiség:</label> <input type='number' onChange={(e)=>(setMennyiseg(e.target.value))} value={mennyiseg}/></div>                
                <div><button onClick={saveData}>Mentés</button></div>
                {editItem && (
                    <div>
                        <button onClick={()=>{
                            handleEditItem(false)
                            
                            }}>Mégsem</button>
                    </div>
                )}
            </div>
        </div>
    )

}

export default Maintenance