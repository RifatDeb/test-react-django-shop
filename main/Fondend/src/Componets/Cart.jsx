import React from 'react'
import { useGlobalState } from '../State/provider'
import { Container,Col,Row } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import {Link, useNavigate}from "react-router-dom"
import { domain,getheader } from '../env'
import Axios  from 'axios'

const Cart = () => {
     const [{ cartuncomplite },dispatch] = useGlobalState()
     const History= useNavigate()
     console.log(cartuncomplite, "$$$  Gloval state  hr");

      let cart_product_length = 0;
  if(cartuncomplite !==null){
    cart_product_length=cartuncomplite?.cartproduct?.length

  }else{
    cart_product_length=0;
  }

  const cartUpdate = async(id)=>{
    await Axios({
      method: "post",
      url:`${domain}/api/updatecart/`,
      data:{"id":id},
      headers:getheader
    }).then(res=>{
      // console.log(res.data, "$$$$$$$cart updeta")
      dispatch({
        type:"PAGE_RELOAD",
        pagereload:res.data
      })
    })
  }

  const editCart = async(id)=>{
    await Axios({
      method: "post",
      url:`${domain}/api/editcart/`,
      data:{"id":id},
      headers:getheader
    }).then(res=>{
      // console.log(res.data, "$$$$$$$cart updeta")
      dispatch({
        type:"PAGE_RELOAD",
        pagereload:res.data
      })
    })
  }


  const deletedCart = async(id)=>{
    await Axios({
      method: "post",
      url:`${domain}/api/deletecart/`,
      data:{"id":id},
      headers:getheader
    }).then(res=>{
      // console.log(res.data, "$$$$$$$cart updeta")
      dispatch({
        type:"PAGE_RELOAD",
        pagereload:res.data
      })
    })
  }

  const DeleteFullCart =async(id)=>{
await Axios({
  method:"post",
  url:`${domain}/api/fullcartdelete/`,
  headers:getheader,
  data:{"id":id}
}).then(res=>{
  // console.log(res.data,  "$$$$$$$$$$ fullcart deleted")
  dispatch({
    type:"PAGE_RELOAD",
    pagereload:res.data
  })

  dispatch({
    type:"CART-UNCOMPLITE",
    cartuncomplite:null
  })
 alert("your Full cart is deleted")
  History('/')
})
  }

  return (
    <Container>
        {
            cart_product_length !== 0 ?
            (
            <Table>
      <thead>
        <tr>
          <th>S.L</th>
          <th>Product</th>
          <th>Price</th>
          <th>Quntity</th>
          <th>Subtotal</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {

      cartuncomplite?.cartproduct.map((item, i)=>
         <tr key={i}>
            <td>{i+1}</td>
            <td>{item.product[0]?.title}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>{item.Subtotal}</td>
            <td> 
              <button onClick={()=> cartUpdate(item.id)} className='btn btn-info'>+</button>
              <button onClick={()=>editCart(item.id)} className='btn btn-danger'>-</button>
              <button onClick={()=>deletedCart(item.id)} className='btn btn-primary'>x</button>
            </td>

      </tr>    
      )
        }
        
      </tbody>
      <tfoot>
        <tr>
          <th colSpan={4}> total : </th>
          <th> {cartuncomplite?.total }</th>

          <Link className='btn btn-primary' to="/orderpages"> Order </Link>
        </tr>
      </tfoot>
    </Table>
  )
    :
    (
            <div>
                <h2> ther is no cart</h2>
            </div>
            )

        }
        <Row>
          <Col>
          <Link className='btn  btn-info' to="/oldorder"> Old Order</Link>
          </Col>
          {
            cart_product_length !==0 &&
            <>
            <Col>
           
           <Link onClick={()=>DeleteFullCart(cartuncomplite?.id)} className=' btn btn-danger'> deleate Cart</Link>

         </Col>
            </>
          }
        </Row>
    </Container>
  )
}

export default Cart
