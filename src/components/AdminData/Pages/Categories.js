import React, { useEffect, useState } from 'react'
import AdminNavbar from '../adminNavbar';
import axios from 'axios';
import { Baseurl } from '../../Baseurl';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { Vortex } from 'react-loader-spinner';

const Categories = () => {
  const token = localStorage.getItem("adminToken");
  const header = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  }

  const [iD, setID] = useState();
  const [update, setUpdate] = useState();
  const [items, setItems] = useState();
  const [cat, setCat] = useState();

  const [loader, setLoader] = useState(false);

  console.log(update, "update");
  console.log(cat, "catid...?")

  const formdata = new FormData();
  formdata.append("name", items)


  const apiData = async () => {

    try {
      setLoader(true)
      const response = await axios.get(`${Baseurl.baseurl}/api/admin/categories`, header)
      setLoader(false)
      setCat(response?.data?.data);
    }
    catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    apiData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])





  const addItem = () => {
    axios.post(`${Baseurl.baseurl}/api/admin/categories`, formdata, header).then((res) => {
      console.log(res, "addItems");
      setItems('');
      apiData()
    }).catch((err) => {
      console.log(err)
    })
  }


  const Show = (id) => {
    axios.get(`${Baseurl.baseurl}/api/admin/categories/${id}`, header).then((res) => {
      setUpdate(res.data.data.name);
    }).catch((err) => {
      console.log(err)
    })
  }

  const Update = () => {


    var urlencoded = new URLSearchParams();
    urlencoded.append("name", update);
    urlencoded.append("_method", "PUT");

    const updateConfig = {
      method: "put",
      url: `${Baseurl.baseurl}/api/admin/categories/${iD}`,
      data: urlencoded,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
    }
    axios(updateConfig).then((res) => {
      apiData();
      console.log(res, "Updata");

    }).catch((err) => {
      console.log(err)
    })
  }




  const Delete = (id) => {
    axios.delete(`${Baseurl.baseurl}/api/admin/categories/${id}`, header).then((res) => {
      apiData();
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })



  }






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
        <div className='container-fluid p-0 ' style={{height:"100vh"}}>
          <AdminNavbar />
          <div className='row mx-0'>
            <div className='col'>
              <div className='d-flex justify-content-between'>
                <h3 className='text-dark'>Categories</h3>
                <button type="button" class="btn btn-outline-dark py-0 px-1 my-3" data-bs-toggle="modal" data-bs-target="#exampleModal1" data-bs-whatever="@mdo">add item</button>
              </div>

              {/* Add item data */}
              <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">New message</h1>
                    </div>
                    <div class="modal-body">
                      <form>
                        <div class="mb-3">
                          <label for="recipient-name" class="col-form-label">Name</label>
                          <input onChange={(e) => setItems(e.target.value)} value={items} type="text" class="form-control" id="recipient-name" />
                        </div>

                      </form>
                    </div>
                    <div class="modal-footer">
                      <button onClick={() => addItem()} type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">Add item</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Add item data */}

              {/* Update item data */}
              <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">Update Message</h1>
                    </div>
                    <div class="modal-body">
                      <form>
                        <div class="mb-3">
                          <label for="recipient-name" class="col-form-label">Name</label>
                          <input onChange={(e) => setUpdate(e.target.value)} value={update} type="text" class="form-control" id="recipient-name" />
                        </div>

                      </form>
                    </div>
                    <div class="modal-footer">
                      <button onClick={() => Update()} type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Update</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Update item data */}

              <div className="table-responsive">
                <table style={{ boxShadow: "rgba(0, 0, 0, 0.8) 1.95px 1.95px 2.6px", backgroundColor:"white" }} className="table border w-100  text-dark">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Update</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cat?.map((val) => {
                        return (
                          <>
                            <tr>
                              <th scope="row">{val.id}</th>
                              <td>{val.name}</td>
                              <td style={{ fontSize: "20px", cursor: "pointer" }} >
                                <button onClick={() => {
                                  Show(val.id)
                                  setID(val.id)
                                }} type="button" data-bs-toggle="modal" style={{backgroundColor:"transparent"}} className='border-0 text-dark' data-bs-target="#exampleModal2" data-bs-whatever="@mdo"><FaEdit /></button></td>
                              <td style={{ fontSize: "25px", cursor: "pointer" }} onClick={() => Delete(val.id)}><MdDeleteForever /></td>
                            </tr>
                          </>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      }
    </>

  )
}

export default Categories;