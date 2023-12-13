import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { postAdminRegister } from "./Services/Api";
const AdminRegistersave = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading,setLoading]=useState(false);

  const data1 = location.state.data;
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const data = location.state?.data; // Use optional chaining to check if data exists
    if (data) {
     

      // You can use axios to send the data to your backend server
     // axios
      //  .post(`http://localhost:1279/adminsave`, data)
      postAdminRegister(data)
        .then((response) => {
          // Handle the response here if needed

          navigate("/regsucess1", { state: { data: data } }); // Use navigate to change the route

          
        })
        .catch((error) => {
          // Handle errors here
          console.error(error);
        });
    } else {
      console.error("Data not found in location state.");
    }
  };
  if(loading){
    
    return <div style={{paddingTop:"18%",color:"green"}}><h1 className='text-center'>Sending Details By Email.....</h1></div>;
  }
  return (
    <div className='default1'>
      <br /> <br /> <br /> 
      <center>
      <h3 style={{ color: 'blue',textDecoration:"underline" }}>Preview</h3>
      <br/>
        <table className="table table-striped table-bordered">
          <thead></thead>
<tbody>
<tr>
  <td>
   ID
  </td>
  <td>{data1.id}</td>
</tr>
<tr>
  <td>
    Name 
  </td>
  <td>{data1.ename}</td>
</tr>
<tr>
  <td>Email</td>
  <td>{data1.email}</td>
</tr><tr>
  <td>Mobile Number</td>
  <td>{data1.mob}</td>
</tr>
</tbody>


        </table>
        
        <br/>
        <button className='btn btn-primary' onClick={handleSubmit}>Confirm</button>
        <br /><br />
        <Link to="/admin">Go Back</Link>
      </center>
    </div>
  );
};

export default AdminRegistersave;
