import React, {useState, useEffect, useRef} from 'react';
import app from "../../../firebaseConfig";
import { imageDb } from '../../../firebaseConfig';
import { getDatabase, ref as ref_database, get, set, push ,} from "firebase/database";
import {getDownloadURL, ref as ref_storage,uploadBytes} from "firebase/storage";
import "../css/maintenance.css"
import {v4} from "uuid";



function Maintenance({selectedCategory,fetchData,product,handleEditItem,editItem,currentUser,handleToogleAddWindow, handleSelectCategory}){

    const [nev,setNev]=useState("");
    const [ar,setAr]=useState("");
    const [mennyiseg,setMennyiseg]=useState("");
    const [img,setImg]=useState();
    const [imgUrl, setImgUrl] = useState("https://st.depositphotos.com/1006899/4187/i/450/depositphotos_41878603-stock-photo-global-delivery.jpg");
    const [pid,setPid]=useState(`${nev}|${v4()}`);
    const [elado,setElado]=useState(currentUser);
    console.log(currentUser)

    const fileInputRef=useRef(null)
  

    //Amennyiben van Product property, tehát amikor meglévő termék adatát frissítjük, a State-k vegyék fel a termék adatait.
    useEffect(() => {
        if (product) {
            setNev(product.nev || "");
            setAr(parseInt(product.Ar) || "");
            setMennyiseg(product.Mennyiseg || "");       
            setPid(product.Pid || `${nev}|${v4()}`);
            setImgUrl(product.imgUrl);            
            setElado(product.elado || currentUser);            
                  
        }
    }, [product]);

    //nev State változásakor frissítse a pid State-et is az új név alapján
   
     useEffect(() => {
        if(!editItem){
            setPid(`${nev}|${v4()}`);  
        }
    }, [nev]); 
    

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setImg(file);
    };


    const saveData = async () => {

        const db = getDatabase(app);
        console.log(v4())
        const imgRef=ref_storage(imageDb,`kepek/${v4()}`)
        let newImgUrl= imgUrl
        
        try{
            
            if(img){
                await uploadBytes(imgRef,img)
                newImgUrl= await getDownloadURL(imgRef) 
            }
        
        const newItemData={

        'Ar':parseInt(ar),
        'Mennyiseg':parseInt(mennyiseg),
        'nev':nev,
        'imgUrl':newImgUrl,
        'Pid': pid,
        'elado': elado
        }
    
        await set(ref_database(db, `Kategoriak/${selectedCategory}/${pid}`),newItemData);
        
        alert("Sikeres mentés")
        fetchData(selectedCategory)
        handleEditItem(false)
        handleToogleAddWindow(false)
       }catch(error) {
          alert("Hiba " + error.message);
       }

       if(!editItem){
        setNev("")
        setAr("")
        setMennyiseg("")
        fileInputRef.current.value=null; 
       }
      }


    return(
        <div className='horizontal main' onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onDragEnter={(e) => e.preventDefault()}>
            <div >
                Válassz ki egy képet
                <div><input type="file" ref={fileInputRef} onChange={(e)=>(setImg(e.target.files[0]))}/></div>
            </div>               
            <div className="vertical" >
                <div>Kategória:
                    <select id="categorySelect" value={selectedCategory} onChange={(e) => handleSelectCategory(e.target.value)}>
                    <option value="">Válassz kategóriát...</option>
                    <option value="Bútorok">Bútorok</option>
                    <option value="Cipők">Cipők</option>
                    <option value="Egyéb">Egyéb</option>
                    <option value="Játékok">Játékok</option>
                    <option value="Ruhák">Ruhák</option>
                    </select>
                     </div>
                <div><label>Termék Név:</label> <input onChange={(e)=>(setNev(e.target.value))} value={nev}/></div>
                <div><label>Termék Ár:</label> <input type='number' onChange={(e)=>(setAr(e.target.value))} value={ar}/></div>
                <div><label>Termék Mennyiség:</label> <input type='number' onChange={(e)=>(setMennyiseg(e.target.value))} value={mennyiseg}/></div>                
                <div><button onClick={saveData}>Mentés</button></div>
                <div>
                    <button onClick={()=>{
                        handleEditItem(false)
                        handleToogleAddWindow(false)
                        
                        }}>
                            Mégsem
                    </button>
                </div>
            
            </div>
        </div>
    )

}

export default Maintenance