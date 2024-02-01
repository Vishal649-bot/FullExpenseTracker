// App.js


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignIn from './pages/SignIn';
import Login from './pages/Login';
import Home from './pages/Home';
import CompleteForm from './pages/CompleteForm';

function App() {
  return (
    <Router>
    {/* <Home/> */}
      <div className="App">
        <Routes>
          <Route path='/' element={<SignIn/>} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/Home' element={<Home/>} />
          <Route path='/Home/complete' element={<CompleteForm/>} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
