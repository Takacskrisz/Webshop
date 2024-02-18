import React, {useState, useEffect} from 'react';
import app from "../../../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import "../css/items.css"
import Maintenance from '../../Maintenance/js/Maintenace';



function Items({selectedCategory,login}){

    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (selectedCategory) {
            fetchData(selectedCategory);
        }
    }, [selectedCategory]);

    const fetchData = async (category) => {
        const db = getDatabase(app);
        const dbRef = ref(db, `Kategoriak/${category}`);
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            setProducts(Object.values(snapshot.val()));
        } else {
            console.log("error");
        }
    }

    function addItem(){
        return <Maintenance selectedCategory={selectedCategory}/>
    }

    const [adding, setAdding]=useState(false)



    return(
        <div className='items productmenu'>
            {console.log(login)}
            {login && !adding &&(
                
                <div>
            <Maintenance selectedCategory={selectedCategory}/>
                </div>
            )}
            {console.log(products)}
            {products.length > 0 ? (
                products.map((item, index) => (
                item.nev && item.Ar && item.Mennyiseg!=null?(
                    <div className="horizontal" >
                        <div><img src="https://st.depositphotos.com/1006899/4187/i/450/depositphotos_41878603-stock-photo-global-delivery.jpg" alt="product"/></div>
                        <div key={index} className="vertical productmenu">
                            <div className='product'>{item.nev}</div>
                            <div>{item.Ar} Ft</div>
                            <div>{item.Mennyiseg >0 ?(<div className='raktar'>Raktáron({item.Mennyiseg})</div>):(<div className='elfogyott'>Elfogyott</div>)}</div>
                            <div><button className='cartbutton'>Kosárba</button></div>
                        </div>
                    </div>
                ):null))
            ) : (
                <p>Nincs elérhető árú</p>
            )}
        </div>
        
    
    )
}

export default Items