import React, {useState, useEffect} from 'react';
import app from "../../../firebaseConfig";
import { imageDb } from '../../../firebaseConfig';
import { getDatabase, ref as ref_database, get, set, push ,} from "firebase/database";
import {getDownloadURL, ref as ref_storage,uploadBytes} from "firebase/storage";
import "../css/maintenance.css"
import {v4} from "uuid";



function Maintenance({selectedCategory,fetchData,product,handleEditItem,editItem}){

    const [nev,setNev]=useState("");
    const [ar,setAr]=useState("");
    const [mennyiseg,setMennyiseg]=useState("");
    const [img,setImg]=useState("");
  

    useEffect(() => {
        if (product) {
            setNev(product.nev || "");
            setAr(parseInt(product.Ar) || "");
            setMennyiseg(product.Mennyiseg || "");       
                  
        }
    }, [product]);

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setImg(file);
    };


    const saveData = async () => {

        const db = getDatabase(app);
        console.log(v4())
        const imgRef=ref_storage(imageDb,`kepek/${v4()}`)
        var imgUrl="";
        var Pid=`${nev}|${v4()}`
        if(product){
            imgUrl=product.imgUrl
        }
        try{
            if(img){
                await uploadBytes(imgRef,img)
                 imgUrl= await getDownloadURL(imgRef)
               
            }
        //if(editItem){ Pid =product.Pid}
        const newItemData={

        'Ar':parseInt(ar),
        'Mennyiseg':parseInt(mennyiseg),
        'nev':nev,
        'imgUrl':imgUrl,
        'Pid': Pid
        }
    
        await set(ref_database(db, `Kategoriak/${selectedCategory}/${Pid}`),newItemData);
        
        alert("Sikeres mentés")
        fetchData(selectedCategory)
        handleEditItem(false)
       }catch(error) {
          alert("Hiba " + error.message);
       }
      }
    return(
        <div className='horizontal main' onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onDragEnter={(e) => e.preventDefault()}>
            <div >
                Válassz ki egy képet
                <div><input type="file" onChange={(e)=>(setImg(e.target.files[0]))}/></div>
            </div>               
            <div className="vertical" >
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