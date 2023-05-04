import { InsertComment, MoreVert, Search, Toll } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import UserProfile from './UserProfile'
import db from '../../firebase'

const Sidebar = ({ user, signOut }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
        const getAllUsers = async () => {
            const data = await db.collection('users').onSnapshot((snapshot) => {
                setAllUsers(
                    snapshot.docs.filter((doc) => doc.data().email !== user?.email)
                );
            });
        };
        const getFriends = async () => {
            const data = await db.collection('FriendList').doc(user.email).collection('list').onSnapshot((snapshot) => {
                setFriendList(snapshot.docs)
            });
        };
        getAllUsers();
        getFriends();
    }, []);


    const searchedUser = allUsers.filter((currentUser) => {
        if (searchInput) {
            if (currentUser.data().displayName.toLowerCase().includes(searchInput.toLowerCase())) {
                return currentUser;
            }
        }
    });

    const searchItem = searchedUser.map((currentUser) => {
        return (
            <UserProfile key={currentUser.id} name={currentUser.data().displayName} photoURL={currentUser.data().photoURL} emailId={currentUser.data().email} />
        )
    })

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-header-img" onClick={signOut}>
                    <Avatar src={user?.photoURL} />
                </div>
                <div className="sidebar-header-name">
                    <h5>{user?.displayName}</h5>
                </div>
                <div className="sidebar-header-btn">
                    <IconButton>
                        <Toll />
                    </IconButton>
                    <IconButton>
                        <InsertComment />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar-search">
                <div className="sidebar-search-input">
                    <Search />
                    <input type="text" name='search' placeholder='Search...' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
                </div>
            </div>
            <div className="sidebar-chat-list">
                {
                    searchItem.length > 0 ?
                        searchItem
                        :
                        (
                            friendList.map((friend) => <UserProfile key={friend.data().email} emailId={friend.data().email} name={friend.data().displayName} photoURL={friend.data().photoURL} lastMessage={friend.data().lastMessage} />)
                        )
                }
            </div>
        </div>
    )
}

export default Sidebar