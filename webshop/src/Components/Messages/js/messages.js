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
    const [selectedProductImgUrl, setSelectedProductImgUrl] = useState(null);

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

        useEffect(() => {
           
            const messageWithProduct = messages.find(message => message.product === selectedProduct);
            if (messageWithProduct) {
                setSelectedProductImgUrl(messageWithProduct.img);
            } else {
                setSelectedProductImgUrl(null); 
            }
        }, [selectedProduct, messages]);

        console.log("Selected product image URL:", selectedProductImgUrl);
    return(

        <div className="horizontal messagemenu">
            <div className="horizontal">
                <div className="Senders">
                    {[...chats].map((sender,index)=><div className="sender" key={index} id={sender} onClick={(e)=>{setSelectedSender(e.target.id);if (toogleChatRoom) {setToogleChatRoom(false);}} }>{sender}</div>)}            
                </div>
                <div>
                    <div>
                    {[...new Set(messages.filter(message => message.sender === selectedSender || message.receiver===selectedSender).map(filteredMessage => filteredMessage.product))].map((product, index) => (
                        <div key={index} id={product} onClick={(e) => {setSelectedProduct(e.target.id);setToogleChatRoom(true)}} className="productM">{product}</div>
                    ))}
                    </div>
                </div>
            </div>
            {toogleChatRoom &&(<div className="vertical chatContainM">
                <div className="selectedCat horizontal ">
                    <div>{selectedSender}</div>
                    <div style={{textAlign:"center", width:"33%"}}><img className="smallimgM" src={selectedProductImgUrl}/></div>
                    <div style={{textAlign:"right", width:"33%"}}>{currentUser}</div>
                </div>
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
                    <div className="horizontal chatboxcontainM">
                       <div> <textarea 
                        placeholder="Írd ide az üzenetet"
                        onInput={(e)=>setNewMessage(e.target.value)}
                        value={newMessage}
                        className="chatbox"/></div>
                        <div><button onClick={handleSubmit} className="submitM">Küldés</button></div>
                    </div>


                </div>
            
            </div>)}
        </div>
    )
}

export default Messages
