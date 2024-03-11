//Szükséges modulok és komponensek beimportálása
import React, {useState, useEffect} from 'react';
import app from "../../../firebaseConfig";
import { getDatabase, ref, get, remove } from "firebase/database";
import "../css/items.css"
import Maintenance from '../../Maintenance/js/Maintenace';
import Homepage from '../../HomePage/js/Homepage';

/** az Items komponens tartalmazza a termékeket, és a hozzájuk tartozó adatokat, továbbá azok karbantartófunkcióit
 * @param {state} selectedCategory A kiválasztott kategória
 * @param {state} login A login értéke
 * @returns {ReactNode} Items komponens
 */
function Items({selectedCategory,login}){

    //Products state, alapértéke üres Tömb, ebbe töltjük fel majd az adatbázisból fogadott termékeket
    const [products, setProducts] = useState([]);
    //editItem state, ez figyeli hogy jelenleg szerkesztünk-e adatot vagy sem. Alapesetben false, nem
    const [editItem, setEditItem]=useState(false);
    //selectedItem state, a kiválasztott terméket tárolja el
    const [selectedItem, setSelectedItem]=useState()

    /** HandleEditItem egy függvény amit propként használva beállíthatjuk az editItem értékét más komponensekben
   * @param {boolean} editing felhasználó neve akit be akarunk állítani jelenleginek
   * @returns {state} editItem
   */
    const handleEditItem=(editing)=>{
        setEditItem(editing)
    }
    //UseEffect ReactHook, figyeli hogy változik-e a kiválasztott kategória, és ha igen, a fetchData függvénnyel lekéri az adatokat az adatbázisból
    useEffect(() => {
        if (selectedCategory) {
            fetchData(selectedCategory);
        }
    }, [selectedCategory]);
   


    /**a fetchData async függvény, ami bekéri az adatokat az adatbázisból kategória alapján, majd beletölti azokat a products state-be
     * @param {string} category kategória ami alapján kigyüjti a termékeket
     * @returns {state} products
     */
    const fetchData = async (category) => {
        //Elmentjük const db-be a korábban beimportált getDatabase funkció segítségével a firebase RealTimeDatabase adatait
        const db = getDatabase(app);
        //Elmentjük const drRef be adatbázison belüli útvonalat, amit a megadott kategória alapján hozunk létre
        const dbRef = ref(db, `Kategoriak/${category}`);
        //létrehozunk egy snapshot-ot, amit az async getfunkció és a korábban elmentett dbRef útvonal segítségével feltöltünk a szükséges adatokkal
        const snapshot = await get(dbRef);

        //a létrehozott snapshotból, amennyiben az kapott értéket , feltöltjük a products state-et. Ellenkezős esetben hibaüzenetet írunk a konzolra
        if (snapshot.exists()) {
            setProducts(Object.values(snapshot.val()));
        } else {
            console.log("error.message");
        }
    }
    /** A removeItem egy async függvény ami kitörli az adott terméket, a termék id je és a kiválasztott kategóra alapján
   * @param {int} id a kiválasztott termék id-je a product state-en belül
   * @param {state} selectedCategory a kiválaszott kategória
   */
    async function removeItem(id,selectedCategory){
        //Elmentjük const db-be a korábban beimportált getDatabase funkció segítségével a firebase RealTimeDatabase adatait
        const db = getDatabase(app);
        //Elmentjük const dbRef-be a törölni kivánt termék adatbázison belüli útvonalát a ref függvény segítségével
        const dbRef = ref(db, `Kategoriak/${selectedCategory}/${products[id].Pid}`)
        //async remove függvény segítségével töröljük a dbRef-ben elmentett útvonalon található termék adatait
        await remove(dbRef)
        //async fetchData függvénnyel újrahívjuk a kiválasztott kategóriát, frissítve ezzel a megjelenített termékeket
        await fetchData(selectedCategory);
    }

    return(
        <div className='items productmenu'  >
            {console.log(login)}
            {login && !editItem && products.length>0 &&(          
                <div>
                    <p>Hozzáad</p>
            <Maintenance selectedCategory={selectedCategory } fetchData={fetchData} handleEditItem={handleEditItem} editItem={editItem}/>
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
                <Homepage/>
                
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