import { useState,useDebugValue, useEffect } from "react"
import { storeDb } from "../../../firebaseConfig"
import { addDoc, collection, serverTimestamp, onSnapshot , query, where} from "firebase/firestore";


function Chat({currentUser}){

    const targetUser="Mintaember"
    const [newMessage, setNewMessage]= useState();
    const [messages, setMessages]= useState([]);

    const messagesRef=collection(storeDb, "Messages")

    useEffect(()=>{
        const queryMessages= query(messagesRef, where("receiver","==", currentUser))
        console.log(currentUser)
       const unsubscribe= onSnapshot(queryMessages, (snapshot)=>{
            let messages=[]
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(), id: doc.id})
            })
            setMessages(messages)

        })
        return ()=> unsubscribe()
    },[currentUser])

    const handleSubmit= async(e)=>{
        e.preventDefault();
        if(newMessage==="") return;


        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            sender: currentUser,
            receiver: targetUser,
        });

        setNewMessage("")

    }
    return(

        <div>
            <div>{messages.map((message)=> <h1>{message.text}</h1> )}</div>
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