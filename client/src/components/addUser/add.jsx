import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import "./add.css"
import axios from "axios"
import toast from "react-hot-toast"


const Add = () => {

    const users = {
        fname:"",
        lname:"",
        email:"",
        password:""
    }
   const [user, setUser] = useState(users);
   const navigate = useNavigate();
  

     const inputHandler =(e)=>{
        const {name, value} = e.target;
         setUser({...user, [name]:value});
        }

    const submitForm = async(e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8000/api/create", user)
        .then((response)=>{
          // console.log(response)
          toast.success(response.data.msg, {position:'top-center'})
          navigate("/")
        }).catch(error => console.log(error))
    }


  return (
    <div className='addUser'>
      <Link to={"/"}>Back</Link>
      <h3>Add New User</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className="inputGroup">
        <label htmlFor="fname"> First Name</label>
        <input type="text" onChange={inputHandler} id="fname" name="fname" autoComplete='off' placeholder='First Name'/>
        </div>
        <div className="inputGroup">
        <label htmlFor="lname"> Last Name</label>
        <input type="text" onChange={inputHandler}  id="lname" name="lname" autoComplete='off' placeholder='Lirst Name'/>
        </div>
        <div className="inputGroup">
        <label htmlFor="email"> Email</label>
        <input type="email" onChange={inputHandler}  id="email" name="email" autoComplete='off' placeholder='Enter Email'/>
        </div>
        <div className="inputGroup">
        <label htmlFor="password"> Password</label>
        <input type="password" onChange={inputHandler}  id="password" name="password" autoComplete='off' placeholder='Enter Password'/>
        </div>
        <div className="inputGroup">
          <button type="submit">Add User</button>
        </div>
      </form>
    </div>
  )
}

export default Add
