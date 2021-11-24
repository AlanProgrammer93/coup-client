import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Start from './pages/Start/Start';

import { currentUser } from './utils/api';

import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      currentUser(token)
        .then(res => {
          localStorage.setItem('token', res.data.token)
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              username: res.data.username
            }
          });
        })
        .catch(err => console.log(err));
    }

  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/:idGame" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
