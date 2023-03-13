import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import {Route,Routes} from 'react-router-dom'


function App() {
  return (
    <>
    <Routes>
      <Route path="" element={<Home />}></Route>
      <Route path="login" element={<Login />}></Route>
    </Routes>
    </>
  );
}

export default App;
