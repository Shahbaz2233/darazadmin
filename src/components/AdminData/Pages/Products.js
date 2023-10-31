import React, { useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import AdminNavbar from '../adminNavbar'
import { Baseurl } from '../../Baseurl'
import axios from 'axios'
import { Line } from 'rc-progress';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { Card, Carousel, Table } from 'react-bootstrap';
import { Vortex } from 'react-loader-spinner';

// /@TheCodebookInc  ....youtube....

const Products = () => {
  const token = localStorage.getItem("adminToken");
  const header = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  }

  const [file, setFile] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles);
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const [categoriesID, setCategoriesID] = useState();
  const [cat, setCat] = useState();
  const [productData, setProductData] = useState();
  const [mediaFilesId, setMediaFilesId] = useState();
  const [loader, setLoader] = useState(false);


  // console.log(productTitle, "productName file.....")



  const apiData = async () => {
    try {
      setLoader(true)
      const response = await axios.get(`${Baseurl.baseurl}/api/admin/categories`, header)
      setLoader(false)
      setCat(response?.data?.data);
    }
    catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  useEffect(() => {
    apiData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getProApi = () => {
    axios.get(`${Baseurl.baseurl}/api/admin/products`, header).then((res) => {
      setProductData(res.data.data);

    }).catch((err) => {
      console.log(err)
    })
  }


  const [title, setTitle] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [discounted, setDiscounted] = useState();
  const [description, setDescription] = useState();
  const [idData, setIdData] = useState();



  const ProductApi = () => {

    const formdata = new FormData();
    formdata.append("cat_id", categoriesID)
    formdata.append("title", title)
    formdata.append("quantity", quantity)
    formdata.append("price", price)
    formdata.append("discounted_price", discounted)
    formdata.append("description", description);

    // eslint-disable-next-line array-callback-return
    file?.map((val, ind) => {
      formdata.append(`media[${ind}][type]`, val.type === "video/mp4" ? "video" : "image")
      formdata.append(`media[${ind}][media]`, val)
    })

    const configProduct = {
      method: "POST",
      url: `${Baseurl.baseurl}/api/admin/products`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    axios(configProduct)
      .then((res) => {
        console.log(res, "product Response----->")
        setTitle("")
        setQuantity("")
        setPrice("")
        setDiscounted("")
        setDescription("")
        setIdData("")

        getProApi();
      }).catch((err) => {
        console.log(err)
      })

  }

  // Delete Product files
  const DeleteApi = (id) => {
    const DeleteProduct = {
      method: "delete",
      url: `${Baseurl.baseurl}/api/admin/products/${id}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    axios(DeleteProduct)
      .then((res) => {
        if (res.status === 200) {
          alert(`${id} Delete Successfully.`)
        }
        // console.log(res, "Delete product Response----->")
        getProApi()
      }).catch((err) => {
        console.log(err)
      })
  }

  // Delete Product files


  const Show = (id) => {
    axios.get(`${Baseurl.baseurl}/api/admin/products/${id}`, header).then((res) => {
      console.log(res.data.data);
      setTitle(res?.data?.data?.title);
      setQuantity(res?.data?.data?.quantity);
      setPrice(res?.data?.data?.price);
      setDiscounted(res?.data?.data?.discounted_price);
      setDescription(res?.data?.data?.description);
    }).catch((err) => {
      console.log(err)
    })
  }

  // Update Product files
  const UpDateApi = () => {

    var urlencoded = new URLSearchParams();
    urlencoded.append("cat_id", categoriesID);
    urlencoded.append("title", title);
    urlencoded.append("quantity", quantity);
    urlencoded.append("price", price);
    urlencoded.append("discounted_price", discounted);
    urlencoded.append("description", description);

    urlencoded.append("_method", "PUT");

    const UpdateProduct = {
      method: "put",
      url: `${Baseurl.baseurl}/api/admin/products/${idData}`,
      data: urlencoded,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    axios(UpdateProduct)
      .then((res) => {
        setTitle("")
        setQuantity("")
        setPrice("")
        setDiscounted("")
        setDescription("")
        setIdData("")

        getProApi()
      }).catch((err) => {
        console.log(err)
      })

  }
  // Update Product files


  // Delete media files
  const mediaFilesDelete = (id) => {
    axios.delete(`${Baseurl.baseurl}/api/admin/products/delete_media/${id}`, header).then((res) => {
      alert(`${id} Delete Successfully.`)
      getProApi();
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
  // Delete media files

  // add media files
  const mediaFilesAdd = () => {

    const formdata = new FormData();
    // eslint-disable-next-line array-callback-return
    file?.map((val, ind) => {
      formdata.append(`media[${ind}][type]`, val.type === "video/mp4" ? "video" : "image")
      formdata.append(`media[${ind}][media]`, val)
    })

    axios.post(`${Baseurl.baseurl}/api/admin/products/add_media/${mediaFilesId}`, formdata, header).then((res) => {
      getProApi();
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
  // add media files




  useEffect(() => {
    getProApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(file, "file=====")

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
            <div className='col' >
              <div className='d-flex justify-content-between py-3'>
                <h3 className='text-dark'>Products</h3>
                <button type="button" onClick={() => {
                }} class="btn btn-outline-dark py-0 px-1 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Add product</button>
              </div>
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">New message</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div>
                        <div class="dropdown">
                          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Category
                          </button>
                          <ul class="dropdown-menu">
                            {
                              cat?.map((val) => {
                                return (
                                  <>
                                    <li onClick={() => {
                                      setCategoriesID(val.id)
                                    }} class="dropdown-item">{val.name}</li>
                                  </>
                                )
                              })
                            }
                          </ul>
                        </div>
                        <div>
                          <label for="recipient-name" class="col-form-label">title</label>
                          <input type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)} class="form-control" id="recipient-name" />
                        </div>
                        <div>
                          <label for="recipient-name" class="col-form-label">quantity</label>
                          <input type="number" name='quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} class="form-control" id="recipient-name" />
                        </div>
                        <div>
                          <label for="recipient-name" class="col-form-label">price</label>
                          <input type="number" name='price' value={price} onChange={(e) => setPrice(e.target.value)} class="form-control" id="recipient-name" />
                        </div>
                        <div>
                          <label for="recipient-name" class="col-form-label">discounted_price</label>
                          <input type="number" name='discounted' value={discounted} onChange={(e) => setDiscounted(e.target.value)} class="form-control" id="recipient-name" />
                        </div>
                        {/* images uploading and dropping */}
                        {/* <label for="recipient-name" class="col-form-label">media</label> */}
                        <div className='m-2'>
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                              isDragActive ?
                                <button className='border m-auto'>Drag and drop files</button> :
                                <button className='border p-1'>Upload File</button>
                            }
                          </div>
                        </div>
                        {/* image uploading and dragging */}
                        {/* <div >
                        <Line percent={0
                        } strokeWidth={2} strokeColor="#068DA9" />
                        <Circle percent={10} strokeWidth={4} strokeColor="#D3D3D3" />
                      </div> */}
                        <div>
                          <label for="recipient-name" class="col-form-label">description
                          </label>
                          <input type="text" name='description' value={description} onChange={(e) => setDescription(e.target.value)} class="form-control" id="recipient-name" />
                        </div>

                      </div>
                    </div>
                    <div class="modal-footer">
                      <button onClick={() => {
                        getProApi();
                        ProductApi();
                      }} type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Send message</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* modal02 */}
              <div class="modal fade" id="exampleModal01" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">Updata message</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div>
                        <div class="dropdown">
                          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            select keys
                          </button>
                          <ul class="dropdown-menu">
                            {
                              cat?.map((val) => {
                                return (
                                  <>
                                    <li onClick={() => {
                                      setCategoriesID(val.id)
                                    }} class="dropdown-item">{val.name}</li>
                                  </>
                                )
                              })
                            }
                          </ul>
                        </div>
                        <div>
                          <label for="recipient-name" class="col-form-label">title</label>
                          <input type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)} class="form-control" id="recipient-name" />
                        </div>
                        <div>
                          <label for="recipient-name" class="col-form-label">quantity</label>
                          <input type="number" name='quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} class="form-control" id="recipient-name" />
                        </div>
                        <div>
                          <label for="recipient-name" class="col-form-label">price</label>
                          <input type="number" name='price' value={price} onChange={(e) => setPrice(e.target.value)} class="form-control" id="recipient-name" />
                        </div>
                        <div>
                          <label for="recipient-name" class="col-form-label">discounted_price</label>
                          <input type="number" name='discounted' value={discounted} onChange={(e) => setDiscounted(e.target.value)} class="form-control" id="recipient-name" />
                        </div>
                        {/* images uploading and dropping */}
                        {/* <label for="recipient-name" class="col-form-label">media</label> */}

                        <div>
                          <label for="recipient-name" class="col-form-label">description
                          </label>
                          <input type="text" name='description' value={description} onChange={(e) => setDescription(e.target.value)} class="form-control" id="recipient-name" />
                        </div>

                      </div>
                    </div>
                    <div class="modal-footer">
                      <button onClick={() => {
                        UpDateApi();
                      }} type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Update message</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* modal02 */}
              {/* modal03 */}
              <div class="modal fade" id="exampleModal02" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">Add media</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div>

                        {/* images uploading and dropping */}
                        {/* <label for="recipient-name" class="col-form-label">media</label> */}
                        <div className='m-2 border '>
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                              isDragActive ?
                                <button className='border m-auto'>Drag and drop files</button> :
                                <button className='border p-1'>Upload File</button>
                            }
                          </div>
                        </div>
                        {/* image uploading and dragging */}
                        <div >
                          <Line percent={0
                          } strokeWidth={2} strokeColor="#068DA9" />
                          {/* <Circle percent={10} strokeWidth={4} strokeColor="#D3D3D3" /> */}
                        </div>

                      </div>
                    </div>
                    <div class="modal-footer">
                      <button onClick={() => {
                        UpDateApi();
                        mediaFilesAdd()
                      }} type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Add media</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* modal03 */}

              <div className='col-md-12 d-flex justify-content-evenly  align-items-center flex-wrap'>
                {
                  productData?.map((val) => {
                    return (
                      <Card style={{ width: '18rem', margin: "20px 3px 20px 3px", background: "rgb(255 255 255 / 44%)", boxShadow: "rgba(0, 0, 0, 0.3) 1.95px 1.95px 2.6px" }}>
                        <Carousel>
                          {val?.media?.map(medVal => (
                            <Carousel.Item style={{ width: '18rem', height: "13rem", position: "relative" }} key={medVal.id}>
                              {medVal?.type === 'image' ? <img src={medVal.media} type={medVal.type} alt="jacket" width="100%" height="100%" />
                                : <video width="100%" height="100%" controls>
                                  <source src={medVal?.media} type={medVal.type} />
                                </video>
                              }
                              <Carousel.Caption>
                                <button className='btn btn-dark' style={{ cursor: "pointer", position: "absolute", bottom: "150px", left: "85px" }} onClick={() => {
                                  mediaFilesDelete(medVal.id)
                                }}>X</button>

                              </Carousel.Caption>
                            </Carousel.Item>
                          ))}
                        </Carousel>
                        <Card.Body>
                          <Table responsive>
                            <thead>
                              <tr>
                                <th>id</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Discount</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{val.id}</td>
                                <td>{val.price}</td>
                                <td>{val.quantity}</td>
                                <td>{val.discounted_price}</td>
                              </tr>
                            </tbody>
                          </Table>
                          <button onClick={() => {
                            setMediaFilesId(val.id)
                          }} class="btn btn-dark float-end" data-bs-toggle="modal" data-bs-target="#exampleModal02" data-bs-whatever="@mdo">Add media</button>
                          <Card.Title>{val.title}</Card.Title>
                          <Card.Text>
                            {val.description}
                          </Card.Text>
                          <div className='d-flex justify-content-between align-content-center mt-2'>
                            <button class="btn" style={{ fontSize: "23px" }} data-bs-toggle="modal" data-bs-target="#exampleModal01" data-bs-whatever="@mdo" onClick={() => {
                              setIdData(val.id)
                              Show(val.id)
                            }}><FaEdit /></button>
                            <button class="btn" style={{ fontSize: "30px" }} onClick={() => DeleteApi(val.id)}><MdDeleteForever /></button>

                          </div>
                        </Card.Body>
                      </Card>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Products;