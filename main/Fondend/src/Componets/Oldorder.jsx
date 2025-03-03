import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { domain, getheader } from '../env'
import { Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'


const Oldorder = () => {
const [Oldorders, setOldorders] = useState( null )
  
  
  useEffect(()=>{
    const getOrder = async()=>{
    await Axios ({
      method:"get",
      url:`${domain}/api/oldorders/`,
      headers:getheader,
}).then(res=>{
  console.log(res.data, "old orders")
  setOldorders(res.data)
})
    }
    getOrder ()
  },[])
  return (
    <div>
    <Container>
    <h1> old Order history</h1>
    <Table>
    <thead>
        <tr>
          <th>S.L</th>
          <th>Product</th>
          <th>Total</th>
          <th>Order Status</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          Oldorders?.length !== null ?
          Oldorders?.map((Item, i)=>{
            return <tr key={i}>
              <td>{i+1}</td>
              <td>{Item?.cartproduct?.length}</td>
              <td>{Item.total}</td>
              <td>{Item.order_status}</td>
              <Link className='btn btn-info' to={`/OrderDetells/${Item?.id}`}> Order Detelis</Link>
            </tr>

          }):<div>
            <h1> No Orders</h1>
            <Link to="/" className='btn btn-primary'> Go to Home </Link>
          </div>
        }
      </tbody>
     
      </Table>
   
    </Container>
      
    </div>
  )
}

export default Oldorder

