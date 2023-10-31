import React, { useState } from 'react'
import AdminNavbar from '../adminNavbar';
import { Baseurl } from '../../Baseurl';
import axios from 'axios';
import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Vortex } from 'react-loader-spinner';

const Orders = () => {

  const token = localStorage.getItem("adminToken")
  const header = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  }

  const [loader, setLoader] = useState(false);

  const [apiData, setApiData] = useState();

  const OrderApi =async () => {
    try{
      setLoader(true)
   const response = await axios.get(`${Baseurl.baseurl}/api/admin/orders`, header)
      setLoader(false)
        setApiData(response?.data?.data)
    }
    catch(error){
      setLoader(false)
      console.log(error)
    }
      
  }

  
  const DeleteProducts = (id) => {
    axios.delete(`${Baseurl.baseurl}/api/admin/orders/${id}`, header).then((res) => {
      console.log(res)
      OrderApi();
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    OrderApi();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
    {loader ? <div style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center  w-100"><Vortex
        visible={true}
        height="100"
        width="100"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      /></div> :
      <div className='container-fluid p-0'>
        <AdminNavbar />
        <div className='row mx-0'>
          {/* <div className='col-2 p-0'>
            <AdminDashboard />
          </div> */}
          <div className='col'>
            <h3 className='text-dark'>Orders</h3>
            <Table style={{boxShadow:"rgba(0, 0, 0, 0.8) 1.95px 1.95px 2.6px", backgroundColor: "white", color: "black" }} responsive="sm">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">items</th>
                  <th scope="col">delivery_status</th>
                  <th scope="col">payment_status</th>
                  <th scope="col">payment_type</th>
                  <th scope="col">user</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {apiData?.map((val) => {
                  console.log(val, "vallllll")
                  return (
                    <> <tr>
                      <th scope="row">{val.id}</th>
                      <td><div>{val.items.length !== 0? val.items.map(val=>val?.quantity): "0"}</div></td>
                      <td>{val.delivery_status}</td>
                      <td>{val.payment_status}</td>
                      <td>{val.payment_type}</td>
                      <td><button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">User</button></td>
                      <td><button onClick={() => {
                        DeleteProducts(val.id)
                      }} type="button" class="btn btn-dark">Delete</button></td>
                      <td><button onClick={() => {
                        // UpDateApi(val.id)
                      }} type="button" class="btn btn-outline-dark">{val?.payment_status === "paid" ? "product deliver" : "pending"}</button></td>
                    </tr>
                      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h1 class="modal-title fs-5" id="exampleModalLabel">User Details</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <Table style={{ backgroundColor: "white", color: "black" }} responsive>
                                <thead>
                                  <tr>
                                    <th className='text-dark' scope="col">id</th>
                                    <th className='text-dark' scope="col">username</th>
                                    <th className='text-dark' scope="col">email</th>
                                    <th className='text-dark' scope="col">phone</th>
                                    <th className='text-dark' scope="col">address</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th className='text-dark' scope="row">{val?.user.id}</th>
                                    <td className='text-dark'>{val?.user.username}</td>
                                    <td className='text-dark'>{val?.user.email}</td>
                                    <td className='text-dark'>{val?.user.phone}</td>
                                    <td className='text-dark'>{val?.user.address}</td>
                                  </tr>
                                </tbody>
                              </Table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })

                }
              </tbody>
            </Table>

          </div>
        </div>
      </div>
}
    </>

  )
}

export default Orders;