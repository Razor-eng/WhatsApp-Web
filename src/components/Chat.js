import React from 'react'
import './Chat.css'
import Sidebar from './constants/Sidebar'
import ChatContainer from './constants/ChatContainer'

function Chat({ user, signOut }) {
    return (
        <div className='chat'>
            <div className="chat-container">
                <Sidebar user={user} signOut={signOut} />
                <ChatContainer currentUser={user} />
            </div>
        </div>
    )
}

export default Chat
