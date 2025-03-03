import React, { useState } from 'react'
import { useGlobalState } from '../State/provider'
import { Col, Container, Row } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { Link, useNavigate } from 'react-router-dom'
import Axios  from 'axios'
import { domain, getheader } from '../env'

const OrderPages = () => {
  const [{ cartuncomplite },dispatch] = useGlobalState()    
  const [address,setaddress]=useState(null)    
  const [email,setemail]=useState(null) 
  const [phone,setphone]=useState(null)   
  const History =useNavigate()
  // console.log(cartuncomplite, '$$$$$$$$$$$$ggggggggggggggg');
   
  // console.log(email);
  // console.log(phone);
  // console.log(address);
  const getdata = {
    "id":cartuncomplite?.id,
    "email":email,
    "mobile":phone,
    "address":address
  }

  const orderSubmite = async()=>{
    await Axios({
      method:"post",
      url:`${domain}/api/oldorders/`,
      headers:getheader,
      data:getdata

    }).then(res=>{
      console.log(res.data)
      dispatch({
        type:"PAGE_RELOAD",
        pagereload:res.data
      })
      dispatch({
        type:"CART-UNCOMPLITE",
        cartuncomplite:null
      })
    History('/oldorder')
    })

    
  }
  
  return (
 <Container>
  <Row>
    {/* __________Cart detels _________*/}
    <Col md={6}>
    <h1> Product Details</h1>
    <Table>
      <thead>
        <tr>
          <th>S.L</th>
          <th>Product</th>

          <th>price</th>
          <th>Quntity</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {
          cartuncomplite?.cartproduct?.map((item, i)=>
          <tr key={i}>
            <td>{i+1}</td>
            <td>{item.product[0]?.title}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>{item.Subtotal}</td>
            
          </tr>
          )
        }
      </tbody>
      <tfoot>
        <tr>
          <td>
            <Link to="/cart" className=' btn btn-primary'> Edit Cart</Link>
          </td>
          <td colSpan={3}>
            total : 
          </td>
          <td>{cartuncomplite?.total}</td>
        </tr>
      </tfoot>
    </Table>
    </Col>


    {/* __________order detels _________*/}
    <Col md={6}>
   <h1> Order Now</h1>

    <div class="form-group">

<label >Email</label>
<input onChange={(e)=>setemail(e.target.value)} type="text" class="form-control" placeholder=" Enter You Email" />
</div>

<div class="form-group">

<label >Address</label>
<input onChange={(e)=>setaddress(e.target.value)} type="text" class="form-control" placeholder="Enter Your Adderss" />
</div>
<div class="form-group">

<label >phone</label>
<input onChange={(e)=>setphone(e.target.value)} type="text" class="form-control" placeholder="Enter Your Phone Number" />
</div>

<button  onClick={orderSubmite}className='btn btn-primary'> Order</button>



    </Col>
  </Row>
 </Container>
  )
}

export default OrderPages
