import React, { useState } from 'react';
import "../../style/sign.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from './adminNavbar';
import formImage from "../../asset/images/formImage.jpg";
import { Baseurl } from '../Baseurl';
import { Vortex } from 'react-loader-spinner';

const AdminLogin = () => {
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate("")

    const [inpt, setInpt] = useState({
        email: "",
        password: ""
    });

    const inputData = (e) => {
        const datName = e.target.name;
        const datValue = e.target.value;
        setInpt({ ...inpt, [datName]: datValue })
    }
    console.log(inpt.email, inpt.password, "inptEmail")

    const getData = async () => {
        const formdata = new FormData()
        formdata.append("email", inpt.email);
        formdata.append("password", inpt.password);

        try {
            setLoader(true)
            const response = await axios.post(`${Baseurl.baseurl}/api/login`, formdata)
            if (response.data.status === true) {
                localStorage.setItem("adminToken", response.data.data.access_token)
                localStorage.setItem("adminDetails", JSON.stringify(response.data.data))
                setLoader(false)
                setInpt({
                    email: "",
                    password: ""
                })
                navigate("/user")
            } else { console.log("error") }
        }
        catch (error) {
            setLoader(false)
            alert("email could'nt find")
            setInpt({
                email: "",
                password: ""
            })
        }

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
            /></div> : <>
                <div className='container'>
                    <div className="row  flex-wrap justify-content-center align-items-center my-3 ">
                        {/* <div className='col-lg-8 d-lg-block d-md-none d-none'>
                            <img src={formImage} width="60%" alt='ima' />
                        </div> */}
                        <div className='col-lg-4 col-md-6 col-sm-4 col-12'>
                            <form style={{ backgroundColor: "rgb(160, 125, 36)" }} className='p-4 mt-3'>
                                {/* <!-- Email input --> */}

                                <div class="form-outline ">
                                    <h3 class="form-label text-center" for="form2Example1">Login form</h3>
                                </div>
                                <div class="form-outline mb-2">
                                    <input type="email" name='email' onChange={(e) => inputData(e)} value={inpt.email} id="form2Example1" className="form-control text-dark" />
                                    <label class="form-label" for="form2Example1">Email address</label>
                                </div>

                                {/* <!-- Password input --> */}
                                <div class="form-outline mb-4">
                                    <input type="password" name='password' onChange={(e) => inputData(e)} value={inpt.password} class="form-control text-dark" />
                                    <label class="form-label" for="form2Example2">Password</label>
                                </div>

                                {/* <!-- 2 column grid layout for inline styling --> */}
                                <div class="row mb-4 ">
                                    <div class="col d-flex justify-content-center">
                                        {/* <!-- Checkbox --> */}
                                        <div class="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
                                            <label className="form-check-label" for="form2Example31"> Remember me </label>
                                        </div>
                                    </div>

                                    <div class="col">
                                        <a style={{ color: "white" }} href="#!">Forgot password?</a>
                                    </div>
                                </div>

                                {/* <!-- Submit button --> */}
                                <button type="button" onClick={() => getData()} class="w-100 btn btn-info btn-block mb-4">Sign in</button>

                                {/* <!-- Register buttons --> */}

                            </form></div>
                    </div>
                </div>
            </>
            }
        </>
    )
}

export default AdminLogin;

