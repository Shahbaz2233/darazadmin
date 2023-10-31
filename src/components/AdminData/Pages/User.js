import React, { useEffect, useState } from 'react'
import AdminNavbar from '../adminNavbar';
import axios from 'axios';
import { Baseurl } from '../../Baseurl';
import { Vortex } from 'react-loader-spinner';

const User = () => {
  const token = localStorage.getItem("adminToken")
  const header = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  }

  // const token = localStorage.getItem("adminToken")
  const [data, setData] = useState()
  console.log(data, "data2121")

  const [loader, setLoader] = useState(false);

  const userData = async () => {
    try {
      setLoader(true)
      const response = await axios.get(`${Baseurl.baseurl}/api/admin/users`, header)
      setLoader(false)
      setData(response.data.data)
    }
    catch (error) {
      console.log(error)
      setLoader(false)

    }
 
  }
  const isActive = (id) => {
    const config = {
      method: "post",
      url: `${Baseurl.baseurl}/api/admin/user/active_deactive/${id}`,
      headers: {
        "Accept": "application/json",
        "Content-type": "Application/json",
        Authorization: `Bearer ${token}`
      }
    }
    axios(config).then((res) => {
      setData(res.data.data)
      console.log(res.data, "isactive")
      userData();

    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    userData();
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
      /></div> : <div className='container-fluid p-0'>
        <AdminNavbar />
        <div className='row mx-0'>
          {/* <div className='col-2 p-0'>
            <AdminDashboard />
          </div> */}
          <div className='col'>
            <div>
              <h3 className='text-dark'>Users</h3>
            </div>
            <div className="table-responsive">
              <table style={{ boxShadow: "rgba(0, 0, 0, 0.8) 1.95px 1.95px 2.6px", backgroundColor: "white" }} className="table text-white border w-100 " >
                <thead>
                  <tr className='text-dark'>
                    <th scope="col">id</th>
                    <th scope="col">FName</th>
                    <th scope="col">LName</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">address</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                {
                  data?.map((val) => {
                    return (
                      <>
                        <tbody>
                          <tr className='text-dark'>
                            <th scope="row">{val.id}</th>
                            <td>{val.fname}</td>
                            <td>{val.lname}</td>
                            <td>{val.email}</td>
                            <td>{val.phone}</td>
                            <td>{val.address}</td>
                            <td ><button className='btn btn-outline-dark' onClick={() => isActive(val.id)}>{val.status === 1 ? "active" : "deactive"}</button></td>
                          </tr>
                        </tbody>
                      </>
                    )
                  })
                }
              </table>
            </div>
          </div>
        </div>
      </div>
      }
    </>
  )
}

export default User;