import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { domain, getheader } from '../env'
import { Container, Table } from 'react-bootstrap'

const OrderDetells = () => {
  const { id } = useParams()
  const [detells, setDetells] = useState(null)
  console.log(detells, "ffjhkjgkgh");


  useEffect(() => {
    const getOrder = async () => {
      await Axios({
        method: "get",
        url: `${domain}/api/oldorders/${id}/`,
        headers: getheader,
      }).then(res => {
        console.log(res.data["data"][0], "$$$$$$$$ Order detits")
        setDetells(res?.data?.data[0])
      })

    }
    getOrder()

  }, []);
  const product = detells?.CartProduct



  return (
    <div>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>date</th>
              <th>Total</th>
              <th>Email</th>
              <th>Number</th>
              <th>Product</th>
            </tr>
          </thead>
          <tbody>
            <tr>

              {
                detells !== null && (
                  <>
                    <td>{detells?.date}</td>
                    <td>{detells?.total}</td>

                    <td>{detells?.email}</td>
                    <td>{detells?.mobile}</td>
                    <td>{detells?.CartProduct?.length}</td>
                  </>
                )
              }
            </tr>
          </tbody>
        </Table>
        <h2>Product details</h2>
        <Table>
          <thead>
            <tr>
              <th>
                S.L
              </th>
              <th>Product</th>
              <th>img</th>
              <th>price</th>
              <th>Quntity</th>
              <th>subtotal</th>

            </tr>
          </thead>
          <tbody>


            {
              product?.map((item, i) =>(
                <tr key={i}>
                <td>{i + 1}</td>
                 <td>{item?.product[0]?.title}</td>
                <td> <img style={{ size: 5 }} src={`${domain}${item?.product[0]?.image}`} alt="" /></td>
                <td>{item?.price}</td>
                <td>{item?.quantity}</td>
                <td>{item?.Subtotal}</td> 


              </tr>
              )
                
              
                
              )
            }

          </tbody>
        </Table>
      </Container>
    </div>
  )
}

export default OrderDetells
