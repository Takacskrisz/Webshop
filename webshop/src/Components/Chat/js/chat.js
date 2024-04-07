import { useState, useEffect } from "react"
import { storeDb } from "../../../firebaseConfig"
import { addDoc, collection, serverTimestamp} from "firebase/firestore";
import "../css/chat.css"


function Chat({currentUser,product,handleToogleChatWindow}){
    const [newMessage, setNewMessage]= useState();
    const [targetUser, setTargetUser]=useState("Mintaember");
    const messagesRef=collection(storeDb, "Messages")

    useEffect(() => {
        if(product){
            setTargetUser(product.elado)
        }
    }, [product]);
    

    const handleSubmit= async(e)=>{
        e.preventDefault();
        if(newMessage==="") return;

        try {
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            sender: currentUser,
            receiver: targetUser,
            product: product.nev,
            img:product.imgUrl,
        });}
        catch(error){
            console.log(error)
            alert(error)
        }
        
        setNewMessage("")
        handleToogleChatWindow(false)
        alert("Üzenet elküldve!")

    }
    return(

        <div className="overlayC">
            <div className="popup">
                <div className="closeC" onClick={()=>{handleToogleChatWindow(false)}}>X</div>
                <div>
                    <p>Érdekel a {product.nev} áru? </p>
                    <p>Vedd fel a kapcsolatot {product.elado} felhasználóval:</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <textarea 
                    placeholder="Írd ide az üzenetet"
                    onInput={(e)=>setNewMessage(e.target.value)}
                    value={newMessage}
                    className="chatbox1"/>
                    <p><button type="submit">Küldés</button></p>
                </form>
            </div>
        </div>
    )
}

export default Chat