import { useEffect, useState } from 'react'
import Axios from 'axios'
import { domain } from '../env'
import SingelProduct from './SingelProduct'
import {Container, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Home = () => {
    const [product, setProduct] = useState(null)
    const [categoryname, setCategoryname] = useState(null)
   
    useEffect(() => {
        const getdata = async () => {
           await Axios({
                method: "get",
                url: `${domain}/api/product/`
            }).then(res => {
                setProduct(res.data)
                 console.log(res.data)
            })
        }
        getdata()
    }, [])
    useEffect(()=>{
        const getcategory = async() =>{
        await Axios ({
            method: "get",
            url: `${domain}/api/category/`
        }).then(res =>{
            console.log(res.data)
            setCategoryname(res.data)
        })
        }
        getcategory()
    },[])   

    

   const previousPages= async () =>{
        await Axios({
            method: "get",
            url: product?.previous
        }).then(res =>{
            console.log(res.data)
            setProduct(res.data)
          
        })

     }
   const nextProduct =async() =>{
        await Axios({
            method: "get",
            url:product?.next
        }).then(res =>{
            console.log(res.data)
            setProduct(res.data)
        })

    }
  return (

<Container>
            <Row>
                <Col md={"9"}>

                <Row>
                    {
                        product !== null &&
                        product?.results.map((item, i) =>(
                            <Col  md={"4"}key={i} > 
                            <SingelProduct  item={item} />
                           
                             </Col>

                        )
                    )
                    }
                  <div className="pagenations"> 

                    <div>
                        {product?.previous !==null ? 
                        (<button onClick={previousPages} className='btn btn-danger'>previous</button>):
                         (
                            <button className='btn btn-danger' disabled >preveus</button>
                        )}
                         </div>
                    <div> 
                    {product?.next !==null ?
                     (
                     <button onClick={nextProduct} className='btn btn-danger '>next</button>): 
                     (
                            <button className='btn btn-danger' disabled>preveus</button>
                        )}
                        </div>
                  </div>

                   </Row>
                        </Col>
                        <Col md={3}>
                        <h1> All Catagory</h1>
                        {
                            categoryname?.categoryname !== null &&
                           categoryname?.map((item,i)=>(
                                <div className="button" key={i}>
                                    <Link className='btn btn-primary my-3' to={`\CategoryProduct/${item?.id}`}>{item.title}</Link>
                                </div>
                            )) 
                        }
                        </Col>
                    
                        </ Row>
                        </Container>
  )
}

export default Home
