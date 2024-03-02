import React, {useState, useEffect} from 'react';
import app from "../../../firebaseConfig";
import { getDatabase, ref, get, remove } from "firebase/database";
import "../css/items.css"
import Maintenance from '../../Maintenance/js/Maintenace';

function Items({selectedCategory,login}){

    const [products, setProducts] = useState([]);
    const [editItem, setEditItem]=useState(false);
    const [selectedItem, setSelectedItem]=useState()

    const handleEditItem=(editing)=>{
        setEditItem(editing)
    }
    useEffect(() => {
        if (selectedCategory) {
            fetchData(selectedCategory);
        }
    }, [selectedCategory]);
   

    useEffect(()=>{
        console.log(editItem)
    },[])
    const fetchData = async (category) => {
        const db = getDatabase(app);
        const dbRef = ref(db, `Kategoriak/${category}`);
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            setProducts(Object.values(snapshot.val()));
        } else {
            console.log("error.message");
        }
    }

    async function removeItem(id,selectedCategory){
        const db = getDatabase(app);
        const dbRef = ref(db, `Kategoriak/${selectedCategory}/${products[id].nev}`)
        await remove(dbRef)
        await fetchData(selectedCategory);
    }

    return(
        <div className='items productmenu'  >
            {console.log(login)}
            {login && !editItem && (
                
                <div>
                    <p>Hozzáad</p>
            <Maintenance selectedCategory={selectedCategory } fetchData={fetchData} product={[]} handleEditItem={handleEditItem} editItem={editItem}/>
                </div>
            )}
            {console.log(products)}
            {!editItem && (
            products.length > 0 ? (
                products.map((item, index) => (
                item.nev && item.Ar && item.Mennyiseg!=null?(
                    
                    <div className="horizontal" >
                        <div><img className='img' src={item.imgUrl ? item.imgUrl : "https://st.depositphotos.com/1006899/4187/i/450/depositphotos_41878603-stock-photo-global-delivery.jpg"} alt={item.nev}/></div>
                        <div key={index} className="vertical productmenu">
                            <div className='product'>{item.nev}</div>
                            <div>{item.Ar} Ft</div>
                            <div>{item.Mennyiseg >0 ?(<div className='raktar'>Raktáron({item.Mennyiseg})</div>):(<div className='elfogyott'>Elfogyott</div>)}</div>
                            <div><button className='cartbutton'>Kosárba</button></div>
                        </div>
                        {login && !editItem &&(
                
                            <div className='vertical maintenancemenu '>
                                <div><button id={index} className='maintenancebuttons' title='Szerkesztés' onClick={(e)=>{
                                    handleEditItem(true)
                                    setSelectedItem(e.target.id)}}> Szerkesztés</button></div>
                                <div><button id={index} className='maintenancebuttons' title='Törlés' onClick={(e)=>{
                                    if(window.confirm(`Biztosan törölni szeretnéd a ${products[e.target.id].nev} terméket?`)){
                                    removeItem(e.target.id,selectedCategory)}
                                }}>Törlés</button></div>
                            </div>
                        )}
                    </div>
                ):null))
            ) : (
                <p>Válasszon kategóriát</p>
                
                )

            )}
            {editItem && (
            <div>
                <p>Szerkesztés</p>
                <Maintenance selectedCategory={selectedCategory } fetchData={fetchData} product={products[selectedItem]} handleEditItem={handleEditItem} editItem={editItem}/>
            </div>
            
            )}
        </div>
        
    
    )
}

export default Items