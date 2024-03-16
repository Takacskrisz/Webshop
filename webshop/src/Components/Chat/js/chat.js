import { useState, useEffect } from "react"
import { storeDb } from "../../../firebaseConfig"
import { addDoc, collection, serverTimestamp} from "firebase/firestore";


function Chat({currentUser,product}){
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
            product: product.Pid,
        });}
        catch(error){
            console.log(error)
        }

        setNewMessage("")

    }
    return(

        <div>
            <div>
                <p>Érdekel a {product.nev} áru? </p>
                <p>Vedd fel a kapcsolatot {product.elado}-val:</p>
            </div>
            <form onSubmit={handleSubmit}>
                <input 
                placeholder="Írd ide az üzenetet"
                onInput={(e)=>setNewMessage(e.target.value)}
                value={newMessage}/>
                <button type="submit">Küldés</button>
            </form>

        </div>
    )
}

export default Chat