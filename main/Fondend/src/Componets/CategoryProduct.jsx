import  Axios from 'axios'
import { useParams,} from 'react-router-dom'
import { domain } from '../env'
import { useState,useEffect } from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import SingelProduct from './SingelProduct'

const CategoryProduct = () => {
    const { id }= useParams()
    const [category, setCategory] = useState(null)

    useEffect(()=>{
        const getcategory = async() =>{
            await Axios ({
                method: "get",
                url:`${domain}/api/category/${id}/`,
                
            }).then(res=>{
                console.log(res.data[0])
                setCategory(res.data[0])
            })

        }
        getcategory()
   
    },[])
  return (
   <Container>
    <Row>
        {
            category?.category !==null &&
            category?.category_product.map((item, i)=>(
                <Col md={3} key={i}>
                    <SingelProduct item={item} />
        
                </Col> 
            ))
        }
    </Row>

   </Container>
  )
}

export default CategoryProduct
