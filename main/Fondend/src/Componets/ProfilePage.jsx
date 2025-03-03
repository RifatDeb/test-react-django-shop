import React, { useState } from 'react';
import { useGlobalState } from '../State/provider';
import { Container, Row } from 'react-bootstrap';
import { domain, getheader } from '../env';
import Axios from 'axios'

const ProfilePage = () => {
  const [{ profile }, dispatch] = useGlobalState()

      // console.log(profile, "$$$  Gloval state")
    const [image,setImage] = useState(null)

    const [email,setEmail] = useState(profile?.prouser.email)
    const [first_name,setFirst_name] = useState(profile?.prouser.first_name)
    const [last_name,setLast_name] = useState(profile?.prouser.last_name)
     
    //  console.log(email);
    //  console.log(first_name);
    //  console.log(last_name);
    //  console.log(image, "this is profill image");
     
    
   const userdataupdate = async() =>{
    await Axios({
      method: "post",
      url:`${domain}/api/userdataupdate/`,
      headers:getheader,
      data:{
        "first_name":first_name,
        "last_name":last_name,
        "email":email
      }
    }).then(res => {
    //  console.log(res.data, "$$ post data");
     dispatch({
      type:"PAGE_RELOAD",
      pagereload: res.data
    })
    
    })
    
   }

   
   const updateprofileimage = async() =>{
    const fromdata = new FormData()
    fromdata.append('image',image)
    await Axios({
      method: "post",
      url:`${domain}/api/updateprofileimage/`,
      headers: getheader,
      data:fromdata
    }).then(res =>{
        console.log(res.data)
       dispatch({
         type:"PAGE_RELOAD",
         pagereload:res.data
      })
       alert(res.data["message"])
    })
   }

  return (
   <Container>
    <Row>
        <div>
          <img src={profile?.image}alt="profile" />
        </div>
        <div className="diss">
          <h2>{profile?.prouser?.username}</h2>
          <p>{profile?.prouser?.email}</p>
          <p>{profile?.prouser?.first_name} {profile?.prouser?.last_name} </p>
          
        </div>
    

      <div className="froms">
      <h1>Edit Hear</h1>
      <div className="form-group">
         <label >Image</label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" className="form-control" />
          <button onClick={updateprofileimage} className='btn btn-primary'>Update</button>

    </div>

            <div class="form-group">
                <label >Email</label>
                <input onChange={(e) => setEmail(e.target.value)} required type="text" class="form-control" placeholder="email"value={email} />
            </div>

          <div className="form-group">
          <label >Fast name</label>
         <input onChange={(e) => setFirst_name(e.target.value)} required type="text" className="form-control"value={first_name} />    
           </div>

           <div className="form-group">
         <label >Last name</label>
        <input onChange={(e) => setLast_name(e.target.value)} type="text"className="form-control" value={last_name} />
     </div >

    
     <button onClick={userdataupdate} className='btn btn-primary'>Update</button>

      </div>
   
    </Row>
   </Container>
  )
}

export default ProfilePage
