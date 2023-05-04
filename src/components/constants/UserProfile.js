import React from 'react'
import './UserProfile.css'
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function UserProfile({ name, photoURL, emailId, lastMessage }) {
    const navigate = useNavigate();

    const goToUser = (emailId) => {
        if (emailId) {
            navigate(`/${emailId}`)
        }
    }

    return (
        <div className='user-profile' onClick={() => goToUser(emailId)}>
            <div className="user-image">
                <Avatar src={photoURL} />
            </div>
            <div className="user-info">
                <p className="user-name">{name}</p>
                {lastMessage && <p className='user-last-message'>{lastMessage}</p>}
            </div>
        </div>
    )
}

export default UserProfile
