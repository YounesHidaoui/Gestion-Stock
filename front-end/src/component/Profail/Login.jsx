import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style/log.css'
import {RiAccountPinBoxFill} from "react-icons/ri"

function Login() {
    const[username,setusername] =useState()
    const[login,setlogin]=useState()
    const[password,setpassword]=useState()
    const[Message,setMessage]=useState()

    const nav = useNavigate();
    console.log(username,login,password)


    async function valide_user(e){
        e.preventDefault()
        await axios.post('http://localhost:3001/login_user',{
            username:username,
            login:login,
            password:password

        }).then(response=>(response.data =='Your login is filed')?alert('Votre Infos pas bien'):nav('/dashboard'))
        
    }



  return (
    <div className='container bt shadow-lg'>
      <div className="header">
        
        <h2>
        <RiAccountPinBoxFill/>Se connecter

        </h2>
        <h3></h3> 
      </div>
      <form className=" needs-validation" noValidate>
  <div className="col">
    <label for="validationCustomUsername" className="form-label">Username</label>
    <div className="input-group has-validation">
      <span className="input-group-text" id="inputGroupPrepend">@</span>
      <input type="text" className="form-control" id="validationCustomUsername" onChange={(e)=>setusername(e.target.value)} aria-describedby="inputGroupPrepend" required />
      <div className="invalid-feedback">
        Please choose a username.
      </div>
    </div>
  </div>
  <div className="col">
    <label for="validationCustom02" className="form-label">Login</label>
    <input type="text" className="form-control" id="validationCustom02" onChange={(e)=>setlogin(e.target.value)} required />
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="col">
    <label for="validationCustom03" className="form-label">Mote de Pass</label>
    <input type="password" onChange={(e)=>setpassword(e.target.value)} className="form-control" id="validationCustom03" required />
    <div className="invalid-feedback">
      Please provide a valid mote de pass.
    </div>
  </div>
  

  <div className="col-12 mt-1">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
      <label className="form-check-label" for="invalidCheck">
        Agree to terms and conditions
      </label>
      <div className="invalid-feedback">
        You must agree before submitting.
      </div>
    </div>
  </div>
  <div className="col-12 mt-2">
    <button className="btn btn-info" type="submit" onClick={(e)=>valide_user(e)}>Entrez</button>
  </div>
</form>
    </div>


  )
}

export default Login