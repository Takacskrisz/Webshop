import "../css/menu.css"

function Menu(){

    return (
        <div >
            <div className="horizontal" style={{backgroundColor:'grey'}}>
                <div style={{width:'80%'}}></div>
                <div style={{width:'20%'}} ><span className="account" >Bejelentkezés</span></div>
            </div>
            <div>
                <img className="headerimg" src=" https://www.shutterstock.com/shutterstock/photos/1822704041/display_1500/stock-photo-close-up-of-cropped-hand-pointing-at-webshop-inscription-online-shopping-concept-1822704041.jpg"/>
            </div>
            <div></div>
        </div>
    )
}
export default Menu;