import "../css/menu.css"

function Menu({handleLogin}){

    return (
        <div >
            <div className="horizontal" style={{backgroundColor:'grey'}}>
                <div style={{width:'80%'}}></div>
                <div style={{width:'20%'}} className="account">
                    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                    <span style={{marginLeft:"20px"}} onClick={() =>handleLogin(true)}>Bejelentkezés</span></div>
            </div>
            
            <div></div>
        </div>
    )
}
export default Menu;