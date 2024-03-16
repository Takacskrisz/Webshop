import { useState, useEffect } from "react"
import { storeDb } from "../../../firebaseConfig"
import { addDoc, collection, serverTimestamp, onSnapshot , query, where, or} from "firebase/firestore";
import "../css/messages.css"



function Messages({currentUser, mode}){
    const [messages, setMessages]= useState([]);
    const[selectedSender, setSelectedSender]=useState("")
    const[selectedProduct, setSelectedProduct]=useState("")
    const[toogleChatRoom, setToogleChatRoom]=useState(false)
    const messagesRef=collection(storeDb, "Messages")
    const [newMessage, setNewMessage]= useState();
    const [targetUser, setTargetUser]=useState("Mintaember");

    useEffect(()=>{
        setTargetUser(selectedSender)
    },[selectedSender])

    useEffect(()=>{
        setToogleChatRoom(false)
    },[mode])
  
    useEffect(()=>{
        const queryMessages= query(messagesRef, or(where("receiver","==", currentUser), where("sender", "==", currentUser)))
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

        const chats = new Set();
         messages.forEach((message) => {
            if (message.sender != currentUser) {
                chats.add(message.sender);
            } 
            if(message.receiver!=currentUser) {
                chats.add(message.receiver);
            }
        });


        const handleSubmit= async(e)=>{
            e.preventDefault();
            if(newMessage==="") return;
    
            try {
            await addDoc(messagesRef, {
                text: newMessage,
                createdAt: serverTimestamp(),
                sender: currentUser,
                receiver: targetUser,
                product: selectedProduct,
            });}
            catch(error){
                console.log(error)
            }
    
            setNewMessage("")
    
        }




    return(

        <div className="horizontal messagemenu">
            <div className="Senders">
                {[...chats].map((sender,index)=><div className="sender" key={index} id={sender} onClick={(e)=>{setSelectedSender(e.target.id)}}>{sender}</div>)}            
            </div>
            <div>
                <div>
                {[...new Set(messages.filter(message => message.sender === selectedSender || message.receiver===selectedSender).map(filteredMessage => filteredMessage.product))].map((product, index) => (
                <div key={index} id={product} onClick={(e) => {setSelectedProduct(e.target.id);setToogleChatRoom(true)}} className="product">{product}</div>
            ))}
                </div>
            </div>
            {toogleChatRoom &&(<div className="vertical">
                <div className="chatroom">
                    <div>
                    {messages.filter(message => (message.sender === selectedSender || message.receiver === selectedSender) && message.product === selectedProduct).sort((a, b) => a.createdAt - b.createdAt).map(filteredMessage => ( 
                        <div key={filteredMessage.id}> 
                        <div className={filteredMessage.sender === currentUser ? "right date" : "left date"}>{filteredMessage.createdAt && filteredMessage.createdAt.toDate().toString()}</div>
                        <div className={filteredMessage.sender === currentUser ? "right" : "left"} >{filteredMessage.text}</div>     
                        </div>
                        ))}
                    </div>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input 
                        placeholder="Írd ide az üzenetet"
                        onInput={(e)=>setNewMessage(e.target.value)}
                        value={newMessage}
                        className="chatbox"/>
                        <button type="submit" className="submitM">Küldés</button>
                    </form>


                </div>
            
            </div>)}
        </div>
    )
}

export default Messages
