import React from 'react'
import './Login.css'
import db, { auth, googleProvider } from '../firebase'
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
    const navigate = useNavigate();
    const login = () => {
        auth.signInWithPopup(googleProvider).then((result) => {
            const newUser = {
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL
            }
            navigate('/');
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
            db.collection('users').doc(result.user.email).set(newUser);
        }).catch(err => alert(err))
    };
    return (
        <div className='login'>
            <div className="login-container">
                <img src="/logo.png" alt="" className='login-logo' />
                <p className="login-name">WhatsApp Web</p>
                <button className="login-btn" onClick={login}>
                    <img src="/google.png" alt="" />
                    Login with Google
                </button>
            </div>
        </div>
    )
}

export default Login
