import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './componets/LoginPage';
import { useState } from 'react';
import { auth } from './firebase.confg';
import Menu from './componets/Menu';
import Hangman from './componets/Hangman/Hangman';
import RPS from './componets/RPS/RPS';
import RPSRoom from './componets/RPS/RPSRoom';
import Race from './componets/Racer/Race';
import RaceRoom from './componets/Racer/RaceRoom';

function App() {
  const [user, setUser] = useState(null)
  auth.onAuthStateChanged((activeUser) => setUser(activeUser))

  return (
    <div>
      <div className='sigh-out font30'>
      {auth.currentUser && (
        <>
          <div>{auth.currentUser?.displayName}</div>
          <button className='font30' onClick={() => auth.signOut()}>Sigh Out</button>
        </>
      )}
      </div>
      <div className='main'>
      <Router>
        <Routes>
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/menu" />} />
          <Route path='/menu' element={user ? <Menu /> : <Navigate to="/login" />} />
          <Route path='/hangman' element={user ? <Hangman /> : <Navigate to="/login" />} />
          <Route path='/race' element={user ? <Race /> : <Navigate to="/login" />} />
          <Route path='/RPS' element={user ? <RPS /> : <Navigate to="/login" />} />
          <Route path='/room/:id' element={user ? <RaceRoom /> : <Navigate to="/login" />} />
          <Route path='/RPSRoom/:id' element={user ? <RPSRoom /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;
