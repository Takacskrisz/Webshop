//Szükséges modulok és komponensek beimportálása
import React, {useState, useEffect} from 'react';
import app from "../../../firebaseConfig";
import { getDatabase, ref, get, remove } from "firebase/database";
import "../css/items.css"
import Maintenance from '../../Maintenance/js/Maintenace';
import Homepage from '../../HomePage/js/Homepage';
import Chat from '../../Chat/js/chat'

/** az Items komponens tartalmazza a termékeket, és a hozzájuk tartozó adatokat, továbbá azok karbantartófunkcióit
 * @param {state} selectedCategory A kiválasztott kategória
 * @param {state} login A login értéke
 * @param {state} currentUser A jelenlegi felhasználó
 * @param {state} mode A jelenlegi mód
 * @returns {ReactNode} Items komponens
 */
function Items({selectedCategory,login,currentUser, mode, handleMode}){

    //Products state, alapértéke üres Tömb, ebbe töltjük fel majd az adatbázisból fogadott termékeket
    const [products, setProducts] = useState([]);
    //editItem state, ez figyeli hogy jelenleg szerkesztünk-e adatot vagy sem. Alapesetben false, nem
    const [editItem, setEditItem]=useState(false);
    //selectedItem state, a kiválasztott terméket tárolja el
    const [selectedItem, setSelectedItem]=useState()
    

    const[toogleChatWindow, setToogleChatWindow]= useState(false);
    const[toogleAddWindow, setToogleAddWindow]= useState(false);

    /** HandleEditItem egy függvény amit propként használva beállíthatjuk az editItem értékét más komponensekben
   * @param {boolean} editing true vagy false érték, hogy jelenleg szerkesztünk-e adatokat
   * @returns {state} editItem
   */
    const handleEditItem=(editing)=>{
        setEditItem(editing)
    }
    /** HandleToogleChatWindow egy függvény amit propként használva beállíthatjuk a toogleChatWindow értékét más komponensekben
   * @param {boolean} chat felhasználó neve akit be akarunk állítani jelenleginek
   * @returns {state} toogleChatWindow
   */
    const handleToogleChatWindow=(chat)=>{
        setToogleChatWindow(chat)
    }
    const handleToogleAddWindow=(add)=>{
        setToogleAddWindow(add)
    }
    //UseEffect ReactHook, figyeli hogy változik-e a kiválasztott kategória, és ha igen, a fetchData függvénnyel lekéri az adatokat az adatbázisból
    useEffect(() => {
        if (mode=="buy" && selectedCategory) {
            fetchData(selectedCategory);
        }
        if (mode=="buy" && selectedCategory=="Minden") {
            fetchAllData();
        }
    }, [selectedCategory]);
   


    /**a fetchData async függvény, ami bekéri az adatokat az adatbázisból kategória alapján, majd beletölti azokat a products state-be
     * @param {string} category kategória ami alapján kigyüjti a termékeket
     * @returns {state} products
     */
    const fetchData = async (category) => {
        if(category=="Minden"){
            return
        }
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

    const fetchAllData = async () => {
        const db = getDatabase(app);
        const dbRef = ref(db, `Kategoriak`);
        const snapshot = await get(dbRef);
    
        if (snapshot.exists()) {
            const allProducts = Object.values(snapshot.val());
            const productsArray = [];
    
            allProducts.forEach(category => {
                if (category.item) {
                    delete category.item; // Remove the "item" key from the category
                    const categoryProducts = Object.values(category);
                    categoryProducts.forEach(product => {
                        productsArray.push(product);
                    });
                }
            });
    
            setProducts(productsArray);
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

    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        function handleScroll() {
        const selectedCat = document.querySelector('.selectedCat');
        const offsetTop = selectedCat.offsetTop;
        const scrollTop = window.scrollY;

        if (scrollTop > offsetTop) {
            setIsFixed(true);
        } else {
            setIsFixed(false);
        }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    return(
        <div>
        {mode=="buy" && selectedCategory!=null&&(<div className={`selectedCat ${isFixed ? 'fixed' : ''}`}>{selectedCategory}</div>)}
        {mode=="sell"&&(<div className='sellI selectedCat'>Eladás Lista</div>)}
        <div className='items productmenu'  >
            {login && !editItem && products.length>0 && mode=="sell" &&(          
                <div>
                    <button className='addbuttonI' onClick={()=>{handleToogleAddWindow(true)}}>Hozzáad</button>
                    {toogleAddWindow && <Maintenance
                        selectedCategory={selectedCategory }
                        fetchData={fetchData}
                        handleEditItem={handleEditItem}
                        editItem={editItem}
                        currentUser={currentUser}
                        handleToogleAddWindow={handleToogleAddWindow}
                        toogleAddWindow={toogleAddWindow} />}
                </div>
            )}
            {!editItem && mode=="buy" &&(
            products.length > 0 ? (
                products.map((item, index) => (
                item.nev && item.Ar && item.Mennyiseg!=null?(
                    
                    <div className="horizontal productmenu" >
                        <div><img className='imgI' src={item.imgUrl ? item.imgUrl : "https://st.depositphotos.com/1006899/4187/i/450/depositphotos_41878603-stock-photo-global-delivery.jpg"} alt={item.nev}/></div>
                        <div key={index} className="vertical ">
                            <div className='product'>{item.nev}</div>
                            <div className='sellerI'>Árulja:{item.elado}</div>
                            <div>{item.Ar} Ft</div>
                            <div><button className='messagebuttonI' id={index} onClick={(e)=>{
                                setSelectedItem(e.target.id)
                                setToogleChatWindow(true)
                                
                                }}
                                disabled={item.elado === currentUser|| !login}
                                title={item.elado === currentUser ? "Nem írhatsz magadnak üzenetet" : (!login ? "Jelentkezz be az üzenetíráshoz" : "")}
                                >Üzenet</button></div>
                        {login && !editItem && currentUser=="admin" &&(
                
                            <div className='vertical maintenancemenu '>
                                <div><button id={index} className='maintenancebuttons' title='Törlés' onClick={(e)=>{
                                    if(window.confirm(`Biztosan törölni szeretnéd a ${products[e.target.id].nev} terméket?`)){
                                    removeItem(e.target.id,selectedCategory)}
                                }}><svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg></button></div>
                            </div>
                            )}
                        </div>

                        
                    </div>
                ):null))
            ) : (
                <Homepage handleMode={handleMode}/>
                
                )

            )}
          
            {!editItem && mode=="sell" &&(
                fetchAllData(),
                products.length > 0 ? (
                
                products.filter(product=>(product.elado==currentUser)).map((item, index) => (
                item.nev && item.Ar && item.Mennyiseg!=null?(
                    
                    <div className="horizontal productmenu" >
                        <div><img className='imgI' src={item.imgUrl ? item.imgUrl : "https://st.depositphotos.com/1006899/4187/i/450/depositphotos_41878603-stock-photo-global-delivery.jpg"} alt={item.nev}/></div>
                        <div key={index} className="vertical ">
                            <div className='product'>{item.nev}</div>
                            <div>{item.Ar} Ft</div>
                            <div>{item.Mennyiseg}{"db"}</div>
                            <div>Árulja:{item.elado}</div>
                            {login && !editItem && mode=="sell" &&(
                
                            <div className='horizontal maintenancemenu '>
                                <div><button id={index} className='maintenancebuttons' title='Szerkesztés' onClick={(e)=>{
                                    console.log(products[e.target.id].nev)
                                    handleEditItem(true)
                                    console.log(products[e.target.id].nev)
                                    setSelectedItem(e.target.id)}}> <svg width="25px" height="25px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
                                    <path fill="#000000" fill-rule="evenodd" d="M15.198 3.52a1.612 1.612 0 012.223 2.336L6.346 16.421l-2.854.375 1.17-3.272L15.197 3.521zm3.725-1.322a3.612 3.612 0 00-5.102-.128L3.11 12.238a1 1 0 00-.253.388l-1.8 5.037a1 1 0 001.072 1.328l4.8-.63a1 1 0 00.56-.267L18.8 7.304a3.612 3.612 0 00.122-5.106zM12 17a1 1 0 100 2h6a1 1 0 100-2h-6z"/>
                                  </svg></button></div>
                                <div><button id={index} className='maintenancebuttons' title='Törlés' onClick={(e)=>{
                                    if(window.confirm(`Biztosan törölni szeretnéd a ${products[e.target.id].nev} terméket?`)){
                                    removeItem(e.target.id,selectedCategory)}
                                }}><svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg></button></div>
                            </div>
                        )}
                        </div>


                        
                    </div>
                ):null))
            ):null)}
            {editItem && (
            <div>
                <p>Szerkesztés</p>
                <Maintenance selectedCategory={selectedCategory } fetchData={fetchData} product={products[selectedItem]} handleEditItem={handleEditItem} editItem={editItem} currentUser={currentUser}/>
            </div>
            
            )}
            {toogleChatWindow &&(
                <Chat currentUser={currentUser} product={products[selectedItem]} handleToogleChatWindow={handleToogleChatWindow} />
            )}
        </div>
        </div>
    
    )
}

export default Items