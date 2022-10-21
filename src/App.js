import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from "./Components/Home";
import Detail from './Components/Detail';
import Search from './Components/Search';
import Login from './Components/Login';
import Protected from './Auth/Protected';
import Register from './Components/Register';
import { useState } from 'react';

function App() {
  const tokenLocalStorage = localStorage.getItem("token");
  // So we will pas token from local storage to this state
  // This is global state
  // For futher, we will use redux for global state (state management)
  const [token, setToken] = useState(tokenLocalStorage);
  return (
    <Routes>
      <Route path="/" element={<Home token={token} setToken={setToken} />} />
      <Route path="/detail/:id" element={
      <Protected token={token} setToken={setToken}>
        <Detail token={token} setToken={setToken} />
      </Protected>} />
      <Route path="/search" element={<Search token={token} setToken={setToken} />} />
      <Route path="/login" element={<Login token={token} setToken={setToken}/>} />
      <Route path="/register" element={<Register token={token} setToken={setToken} />} />
    </Routes>
  );
}

export default App;
