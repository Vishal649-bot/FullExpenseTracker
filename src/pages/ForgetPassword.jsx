import  { useState } from 'react';
import '../components/Forget/ForgetPassword.css'
function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSendLink = async(e) => {
    e.preventDefault();
    // Handle sending password reset link logic
    console.log('vis');
    const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCjPHPbwO6y6-tia4sWzTa4IoVfCK544O8",{
        method: "POST",
        body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
            
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await response.json()
    console.log(data);
  };

  return (
    <div className="ForgotPasswordPage">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSendLink}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Link</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
