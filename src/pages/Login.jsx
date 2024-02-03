// Login.js
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/Auth';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../components/Login/Login.css';
// import ForgotPassword from './ForgetPassword';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

    console.log('kkk');
    if(response.ok){
      
      navigate('/Home');
    }
    // const data = await response.json()
    const data = await response.json();
      dispatch(loginSuccess({ userId: data.localId, bearerToken: data.idToken }));
      localStorage.setItem('token', data.idToken );
    
    
    const emailvarifi = await  fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCjPHPbwO6y6-tia4sWzTa4IoVfCK544O8", {
        method: "POST",
        body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: data.idToken
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    const varifi =await emailvarifi.json()
    console.log(varifi);
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
        <p>Dont have an account? <Link to="/">Sign Up</Link></p>
        <button><Link to='/Forget'>Forget Password</Link></button>
      </form>
    </div>
  );
}

export default Login;
//akum599@gmail.com