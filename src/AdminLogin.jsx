import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { postAdminLogin } from './Services/Api';
const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword,setShowPassword]=useState(false);
  const navigate = useNavigate(); // Use useNavigate to get the navigate function
  const setResponse=(type)=>{
    if(showPassword===true){
     setShowPassword(false)
    }
    else{
     setShowPassword(true)
    }
   }
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };
    var v = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[*&@#]).{6,}/; 
    if(!data.password.match(v)){
      alert("Password Should Minimum 6 Digits,Should have at least one uppercase and  Lowercase,One Numeric And Special Symbols Like @,&,*,#")
      return false;
    }
   // axios
    //  .post('http://localhost:1279/adminloginform', data)
    postAdminLogin(data)
    .then((response) => {
      if (response.status === 200) {
        
        // Save the token to localStorage
        localStorage.setItem('jwtToken', response.data.jwt);
      
      
        // Navigate to the success route
        navigate("/viewalldetails", { state: { data: data } });
      } else {
        alert("Invalid credentials");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Invalid credentials");
    });
  };
const handleSubmit1=()=>{
navigate("/admin")
}
return (
  <div style={{backgroundColor:"#f0f2f5",minHeight:"99vh"}}>
    <center>
     
      <div style={{paddingTop:"8%"}}>
      <h2 style={{color:"blue"}}>Login to CRM System</h2>
      <br/>  <br/>
      <form onSubmit={handleSubmit}>
       
                <input type="email" value={email} className='form-control' onChange={(e) => setEmail(e.target.value)} autoComplete='email' placeholder='Enter Email'style={{width:"20%"}}required />
             
          <br/>   
             
              
<input type={showPassword ? 'text' : 'password'} value={password}  className='form-control' onChange={(e) => setPassword(e.target.value)} autoComplete='new-password'placeholder='Enter Password'style={{width:"20%"}} required />        
           <br/>    
<button type="button" style={{height:"40px",width:"60px",border: "2px solid #3498db",}} className='btn btn-' onClick={()=>setResponse(showPassword)}>{showPassword ? 'Hide':'Show'}</button>
                <br/> 
        <br />
        <button className='btn btn-primary ' type="submit" style={{width:"20%",fontSize:"18px"}}>Log In</button>
      </form>
        <br/>
        <Link to="/adminforgetpassword">Forget Password?</Link>
       </div>
       <div>
       <br/>
<button className='btn btn-success' onClick={handleSubmit1} >Create New Account</button>
       </div>
      
      </center>
    </div>
  );
};

export default AdminLogin;