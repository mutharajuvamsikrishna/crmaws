import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { AdminRegister } from "./Services/Api";
const TagRegister = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [ename, setEname] = useState("");
  const [mob, setMob] = useState("");
  const [password, setPassword] = useState("");
  const [cnpassword, setCnPassword] = useState("");
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const [showPassword,setShowPassword]=useState(false);
  const [showPassword1,setShowPassword1]=useState(false);
  const setResponse=(type)=>{
    if(showPassword===true){
     setShowPassword(false)
    }
    else{
     setShowPassword(true)
    }
   }
   const setResponse1=(type)=>{
    if(showPassword1===true){
     setShowPassword1(false)
    }
    else{
     setShowPassword1(true)
    }
   }
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      id: id,
      email: email,
      ename: ename,
      mob: mob,
      password: password,
      cnpassword: cnpassword,
    };
    var v45 = /^[a-zA-Z\s]*$/;
    var v1 = data.password;
    var v2 = data.cnpassword;
    var v46= /^\d{10}$/;
    if (!data.ename.match(v45)) {
      alert("Name Alphabets Only");

      return false;
    }

    if (!data.mob.match(v46)) {
      alert("Mobile Number is 10 Digits and Numeric only");
      return false;
    }
    if (v1 != v2) {
      alert("Password doesn't Match To Confirm Password");
      return false;
    }
    setLoading(true)
   // axios
    //  .post("http://localhost:1279/adminregister", data)
    AdminRegister(data)
      .then((response) => {
        if (response.data === "adminotp1") {
          

          navigate("/adminotp", { state: { data: data } }); // Use navigate to change the route
        } else {
          
          navigate("/adminregfail");
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };
  if (loading) {
    return <div style={{paddingTop:"18%",color:"green"}}><h1 className='text-center'>Sending OTP.....</h1></div>;
  }
  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: "100vh" }}>
      <div style={{paddingTop:"4%"}} >
        <h2 className='text-center'style={{ color: 'blue' }}>Sign Up for CRM System</h2>
      </div>
      <div style={{paddingTop:"1%"}}>
        <center>
          <form onSubmit={handleSubmit}>
          <table cellPadding={20}>
            <tbody>
            <tr className='addmore1'>
                <td>Employee ID</td>
                <td>
                  <input type="text"
                  name="id"
                  placeholder='Enter Employee ID'
                  className='form-control'
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  style={{width:"300px"}}
                  required
                  />
                </td>
              </tr>
              <tr className='addmore1'>
                <td>Email</td>
                <td>
                  <input type="text"
                  name="email"
                  placeholder='Enter Email'
                  className='form-control'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{width:"300px"}}
                  required
                  />
                </td>
              </tr>
              <tr className='addmore1'>
                <td>Name</td>
                <td>
                  <input type="text"
                  name="ename"
                  placeholder='Enter Name'
                  className='form-control'
                  value={ename}
                  onChange={(e) => setEname(e.target.value)}
                  style={{width:"300px"}}
                  required
                  />
                </td>
              </tr>
              <tr className='addmore1'>
                <td>Mobile Number</td>
                <td>
                  <input type="text"
                  name="mob"
                  placeholder='Enter Mobile Number'
                  className='form-control'
                  value={mob}
                  onChange={(e) => setMob(e.target.value)}
                  style={{width:"300px"}}
                  required
                  />
                </td>
              </tr>
              <tr className='addmore1'>
                <td>Password</td>
                <td>
                  <input type={showPassword?"text":"password"}
                  name="password"
                  placeholder='Enter Pasword'
                  className='form-control'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{width:"300px"}}
                  required
                  />
                </td>
                <td>
                <button type="button" style={{height:"40px",width:"60px",border: "2px solid #3498db",}} className='btn btn-' onClick={()=>setResponse(showPassword)}>{showPassword? 'Hide':'Show'}</button>
                </td>
              </tr>
              <tr className='addmore1'>
                <td>Confirm Password</td>
                <td>
                  <input type={showPassword1?"text":"password"}
                  name="password"
                  placeholder='Enter Confirm Pasword'
                  className='form-control'
                  value={cnpassword}
                  onChange={(e) => setCnPassword(e.target.value)}
                  style={{width:"300px"}}
                  required
                  />
                </td>
                <td>
                <button type="button" style={{height:"40px",width:"60px",border: "2px solid #3498db",}} className='btn btn-' onClick={()=>setResponse1(showPassword1)}>{showPassword1? 'Hide':'Show'}</button>
                </td>
              </tr>
            </tbody>
          </table>
          <br/>
          <button className='btn btn-primary' type='submit'>Submit</button>
          </form>
          <br/>
          <Link to="/login" style={{color:"blue"}}>Login, if you have an account!</Link>
        </center>
      </div>
      <br/><br/>
     </div>

    
  );
};

export default TagRegister;
