import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Chat from './components/Chat';
import { useState } from 'react';
import Login from './components/Login';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  const signOut = () => {
    auth.signOut().then(() => {
      setUser(null);
      localStorage.removeItem('user');
    }).catch(err => alert(err));
  };
  return (
    <BrowserRouter>
      <div className="App">
        {user ? (
          <Routes>
            <Route path='/' element={<Home user={user} signOut={signOut} />} />
            <Route path='/:emailId' element={<Chat user={user} signOut={signOut} />} />
          </Routes>
        ) : (
          <Login setUser={setUser} />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
