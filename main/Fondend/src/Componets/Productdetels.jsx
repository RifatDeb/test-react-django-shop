import React, { useEffect, useState } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import { domain, getheader} from '../env'
import Axios from 'axios'
import SingelProduct from './SingelProduct'
import { Col, Row } from 'react-bootstrap'
import { useGlobalState } from '../State/provider'

const Productdetels = () => {
const {id} = useParams()
const [product, setProduct] = useState(null)
const [productcategory, setproductcategory] = useState(null)
const [{profile }, dispatch] = useGlobalState()
const History= useNavigate()


 useEffect(() => {
     const getdata = async () => {
          await Axios({
                method: "get",
                url: `${domain}/api/product/${id}/`
            }).then(res => {
                console.log(res.data)
                setProduct(res.data)
                getcategory(res?.data?.category[`id`])
            })
        }
        getdata()
    }, [id])


      const getcategory = async (id) => {
           await Axios({
                 method: "get",
                 url: `${domain}/api/category/${id}/`
             }).then(res => {
                 console.log(res.data)
                 setproductcategory(res.data)
             })
         }


        

  const AddtoCart = async(id)=>{
    profile !==null ?(

    
    await Axios({
      method: "post",
      url:`${domain}/api/addtocart/`,
      data:{"id":id},
      headers:getheader
    }).then(res=>{
      console.log(res.data, "$$$$$$$Add to cart")
      dispatch({
        type:"PAGE_RELOAD",
        pagereload:res.data
      })
      dispatch({
        type:"CART-UNCOMPLITE",
        cartuncomplite:null
      })
    })
  ) : (
     History('/LoginPage')
  )
  }
  return (
    <div>
      {
        product !== null && (
            
             <> <div>
                <img src={product?.image} alt="" />
                <Link onClick={()=>AddtoCart(id)} className='btn btn-primary'>Add to Cart</Link>
                <h2>{product.title}</h2>
                <p> {product.description}</p>
                <p>price <del> {product.marketprice}</del> {product.sellingprice} </p>
   
                </div>
                </> 
        
        
        )
      
      }
      <Row>
        <h1> Related Product</h1>
        { 
          productcategory !==null &&
          productcategory[0]?.category_product.map((item, i)=>(
           <Col md={3} key={i}>
             <SingelProduct item={item} /> 
           </Col>
          ))
         
        }
      </Row>
    </div>
  )
}

export default Productdetels
