import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import JoinRoom from './componets/joinRoom';
import LoginPage from './componets/LoginPage';
import { useState } from 'react';
import { auth } from './firebase.confg';
import Room from './shared/chatRoom';
import Menu from './componets/Menu';
import RPS from './componets/RPS';
import RPSRoom from './componets/RPSRoom';
import Hangman from './componets/Hangman/Hangman';

function App() {
  const [user, setUser] = useState(null)
  auth.onAuthStateChanged((activeUser) => setUser(activeUser))

  return (
    <div>
      {auth.currentUser && (
        <>
          <div>{auth.currentUser?.displayName}</div>
          <button onClick={() => auth.signOut()}>Sigh Out</button>
        </>
      )}
      <Router>
        <Routes>
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/menu" />} />
          <Route path='/menu' element={user ? <Menu /> : <Navigate to="/login" />} />
          <Route path='/hangman' element={user ? <Hangman /> : <Navigate to="/login" />} />
          <Route path='/joinRoom' element={user ? <JoinRoom /> : <Navigate to="/login" />} />
          <Route path='/RPS' element={user ? <RPS /> : <Navigate to="/login" />} />
          <Route path='/room/:id' element={user ? <Room /> : <Navigate to="/login" />} />
          <Route path='/RPSRoom/:id' element={user ? <RPSRoom /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
