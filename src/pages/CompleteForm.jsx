import  { useState,useEffect } from 'react';
import Home from './Home';
import '../components/CompleteForm/CompleteForm.css'
function CompleteForm() {
  const [fullName, setFullName] = useState('');
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
//   const [Data, setData] = useState(true)
const token = localStorage.getItem('token')
    useEffect(() => {
        const fetchdata = async()=>{
            const respone = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCjPHPbwO6y6-tia4sWzTa4IoVfCK544O8",{
                method: "POST",
                body: JSON.stringify({
                    idToken: token,
                   
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await respone.json();
            console.log(data);
            setFullName(data.users[0].displayName);
            setProfilePhotoUrl(data.users[0].photoUrl)
            
    }

    fetchdata()
    }, [])
    

  const handleUpdate = async(e) => {
    e.preventDefault();
    // Handle update logic
    const token = localStorage.getItem('token')
    console.log(token);
    const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key= AIzaSyCjPHPbwO6y6-tia4sWzTa4IoVfCK544O8", {
        method: "POST",
        body: JSON.stringify({
            idToken: token,
            displayName: fullName,
            photoUrl: profilePhotoUrl,
            returnSecureToken: true
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await response.json()
   console.log(data);
    
  };

  return (
    <div >
    <Home/>
    <div className='CompleteForm'>
      <h2>Contact Details</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="profilePhotoUrl">Profile Photo URL:</label>
          <input
            type="text"
            id="profilePhotoUrl"
            value={profilePhotoUrl}
            onChange={(e) => setProfilePhotoUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
      </div>
    </div>
  );
}

export default CompleteForm;
