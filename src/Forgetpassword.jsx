import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./Application.css";
import { postUserForgetPassword } from './Services/Api';
const Forgetpassword = () => {
  const [email, setEmail] = useState('');
  const [mob, setMob] = useState('');
  const navigate = useNavigate();
const[loading,setLoading]=useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email: email,
      mob: mob,
    };

    if (data.mob.length !== 10) {
      alert("Mobile Number Should be 10 Digits Only");
      return;
    }
setLoading(true)
    try {
     // const response = await axios.post('http://localhost:1279/changepassword', data);
    const response= await postUserForgetPassword(data);
     
      if (response.data === "otp") {
        
        
        navigate("/changepassword", { state: { data: data } }); // Use navigate to change the route
      } else {
        navigate("/Invalidcredits"); // Navigate to "/Invalidcredits"
        
      }
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
  };
  if (loading) {
    return <div style={{paddingTop:"18%",color:"green"}}><h1 className='text-center'>Sending OTP.....</h1></div>;
  }
  return (
    <div className='password' style={{ backgroundColor: '#f0f2f5', height: '99vh',paddingTop:"10%" }}>
      <center>
        
        <h2 style={{color:"blue"}}>Forget Password</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <table cellPadding={13}>
            <tbody>
              <tr>
                <td>Email</td>
                <td>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter Email" autoComplete='email'
                  style={{width:"140%"}} className='form-control' required />
                  
                </td>
              </tr>
                   
              <tr>
                <td>Mobile</td>
                <td>
                  <input type="text" value={mob} onChange={(e) => setMob(e.target.value)} autoComplete='tel'
                    placeholder="Enter Mobile Number" style={{width:"140%"}} 
                     className='form-control'required />
                </td>
              </tr>

            </tbody>
          </table>
          <br /> 
          <button type="submit" class='btn btn-primary' >Submit</button>
        </form>
        <br />
        <Link to="/login">Go Back</Link>
      </center>
    </div>
  );
};

export default Forgetpassword;
