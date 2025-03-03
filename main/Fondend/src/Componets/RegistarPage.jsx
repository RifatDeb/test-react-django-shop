import React, { useState } from 'react'
import Axios from 'axios'
import { domain, header2 } from '../env'
import { useNavigate } from 'react-router-dom'

const RegistarPage = () => {
  const History = useNavigate()
  const [userName,setUserName]=useState(null)
  const [password,setpassword]=useState(null)
  const [confrimPassword,setconfrimPassword]=useState(null)
  console.log(userName);
  console.log(password);
  console.log(confrimPassword);
  const registerUser = async()=>{
    if(password !== confrimPassword){
      alert("password Not Match Try Agin")
    }else{
      await Axios({
        method:"post",
        url:`${domain}/api/register/`,
        headers:header2,
        data:{
          "username":userName,
          "password":password
        }

      }).then(res=>{
        console.log(res.data)
        alert(res.data['message'])
        History('/loginPage')
      })
    }
  }
  
  
  return (
    <>
      <h1> Registar Here</h1>
      <div class="form-group">

<label >UserName</label>
<input onChange={(e)=>setUserName(e.target.value)} type="text" class="form-control" placeholder="Enter Your UserName" />
</div>


<div class="form-group">

<label >Password</label>
<input onChange={(e)=>setpassword(e.target.value)} type="password" class="form-control" placeholder="Enter Your Password" />
</div>
    
<div class="form-group">

<label >ComfrimPassword</label>
<input onChange={(e)=>setconfrimPassword(e.target.value)} type="password" class="form-control" placeholder="ReType PassWord" />
</div>
<button onClick={registerUser} className='btn btn-primary'>Registar </button>

  </>
    
  )
}

export default RegistarPage
