import React, { useEffect, useRef, useState } from 'react'
import './ChatContainer.css'
import { Avatar } from '@mui/material'
import { AttachFile, InsertEmoticon, MoreVert, Send } from '@mui/icons-material'
import ChatMessage from './ChatMessage'
import Picker from 'emoji-picker-react'
import { useParams } from 'react-router-dom'
import db from '../../firebase'
import firebase from 'firebase/compat/app'

function ChatContainer({ currentUser }) {
    const [message, setMessage] = useState('');
    const [openEmojiBox, setOpenEmojiBox] = useState(false)
    const { emailId } = useParams();
    const [chatUser, setChatUser] = useState({});
    const [chatMessages, setChatMessages] = useState([]);
    const chatBox = useRef(null);

    useEffect(() => {
        const getUser = async () => {
            const data = await db.collection('users').doc(emailId).onSnapshot((snapshot) => {
                setChatUser(snapshot.data());
            })
        };
        const getMessages = async () => {
            const data = await db.collection('chats').doc(emailId).collection('messages').orderBy('timestamp', 'asc').onSnapshot((snapshot) => {
                let messages = snapshot.docs.map((doc) => doc.data());

                let newMessage = messages.filter((message) => message.senderEmail === (currentUser.email || emailId) || message.receiverEmail === (currentUser.email || emailId));

                setChatMessages(newMessage);
            })
        };

        getUser();
        getMessages();
    }, [emailId]);

    useEffect(() => {
        chatBox.current.addEventListener('DOMNodeInserted', (event) => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
        })
    }, [chatMessages]);

    const send = (e) => {
        e.preventDefault();
        if (emailId) {
            let payload = {
                text: message,
                senderEmail: currentUser?.email,
                receiverEmail: emailId,
                timestamp: firebase.firestore.Timestamp.now()
            };
            // Sender
            db.collection('chats').doc(currentUser.email).collection('messages').add(payload);
            // Reciever
            db.collection('chats').doc(emailId).collection('messages').add(payload);

            db.collection('FriendList').doc(currentUser.email).collection('list').doc(emailId).set({
                email: chatUser.email,
                displayName: chatUser.displayName,
                photoURL: chatUser.photoURL,
                lastMessage: message
            });
            db.collection('FriendList').doc(emailId).collection('list').doc(currentUser.email).set({
                email: currentUser.email,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
                lastMessage: message
            });
        }
        setMessage('');
    };

    return (
        <div className='Chat-container'>
            <div className="chat-container-header">
                <div className="chat-user-info">
                    <div className="chat-user-img">
                        <Avatar src={chatUser?.photoURL} />
                    </div>
                    <p>{chatUser?.displayName}</p>
                </div>
                <div className="chat-container-header-btn">
                    <MoreVert />
                </div>
            </div>
            <div className="chat-display-container" ref={chatBox}>
                {
                    chatMessages.map((message, i) => (
                        <ChatMessage
                            key={i}
                            message={message.text}
                            time={message.timestamp}
                            sender={message.senderEmail}
                        />
                    ))
                }
            </div>
            <div className="chat-input">
                {openEmojiBox && <Picker onEmojiClick={(event, emojiObject) => setMessage(message + event.emoji)} />}
                <div className="chat-input-btn">
                    <InsertEmoticon onClick={() => setOpenEmojiBox(!openEmojiBox)} />
                    <div className='attach'>
                        <AttachFile />
                    </div>
                </div>
                <form onSubmit={send}>
                    <input type="text" placeholder='Type a Message' value={message} onChange={(e) => setMessage(e.target.value)} />
                </form>
                <div className="chat-input-send-btn" onClick={send}>
                    <Send />
                </div>
            </div>
        </div>
    )
}

export default ChatContainer
