import React from "react";
import { useState } from "react";
import "../css/homepage.css"

function Homepage({handleMode}){

    const [isOnline, setIsOnline] = React.useState(navigator.onLine);

    React.useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <div>
            {isOnline ? (
            <>
                <div>Válassz egy kategóriát!</div>
                <div>Vásárláshoz vagy eladáshoz jelentkezz be!</div>
                <div>Ha nincs felhasználói fiókod, regisztrálj be 
                     <span  className="regClick"
                            title="Kattints ide a regisztrációhoz"
                            onClick={()=>handleMode('register')}>itt.
                     </span>
                </div>
            </>
            ) : (
                <div>Nincs internetkapcsolat</div>
            )}
        </div>
    );
}

export default Homepage;