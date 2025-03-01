import React, { useEffect, useState } from 'react'
import "./User.css";
import { Link } from 'react-router-dom'
import axios from 'axios';
import toast from "react-hot-toast"
const User = () => {

const [users, setUsers] = useState([]);



  useEffect(()=>{
    const fetchData = async()=>{
     const response =   await axios.get("http://localhost:8000/api/getall")
     setUsers(response.data);
    }
    fetchData();
  },[])

   const deleteUser = async(userId) =>{
       await axios.delete(`http://localhost:8000/api/delete/${userId}`)
       .then((response)=>{
       setUsers((prevUSer)=> prevUSer.filter((user)=> user._id !== userId))
       toast.success(response.data.msg,{position:'bottom-right'})
       })
       .catch((error)=>{
        console.log(error)
       })
   }

  return (
    <div className='userTable'>
      <Link to={"/add"} className='addButton'>Add User</Link>
      <table border={1} cellSpacing={0} cellPadding={10}>
        <thead>
            <tr>
                <th>S.No.</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Actions </th>
            </tr>
        </thead>
        <tbody>
          {
            users.map((user, index)=>{
              return(
                <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.fname} {user.lname}</td>
                <td>{user.email}</td>
                <td className='actionButtons'>
                    <button onClick={()=> deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
                    <Link to={`/edit/`+user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                </td>
            </tr>
              )
            })
          }
           
        </tbody>
      </table>
    </div>
  )
}

export default User
