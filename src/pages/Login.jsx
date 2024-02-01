// Login.js

import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../components/Login/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Handle login logic
    const response = await  fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCjPHPbwO6y6-tia4sWzTa4IoVfCK544O8", {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    
    if(response.ok){
        navigate('/Home')
    }
    const data = await response.json()
    console.log(data);
    localStorage.setItem('token', data.idToken )
  };

  return (
    <div className="LoginForm">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/">Sign Up</Link></p>
      </form>
    </div>
  );
}

export default Login;
//akum599@gmail.com