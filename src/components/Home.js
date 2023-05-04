import React from 'react'
import './Home.css'
import Sidebar from './constants/Sidebar'

function Home({ user, signOut }) {
    return (
        <div className='home'>
            <div className="home-container">
                <Sidebar user={user} signOut={signOut} />
                <div className="home-bg">
                    <img src="/whatsapp.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Home
