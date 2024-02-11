import "../css/menu.css"

function Menu(){

    return (
        <div >
            <div className="horizontal" style={{backgroundColor:'grey'}}>
                <div style={{width:'80%'}}></div>
                <div style={{width:'20%'}} ><span className="account" >Bejelentkezés</span></div>
            </div>
            
            <div></div>
        </div>
    )
}
export default Menu;