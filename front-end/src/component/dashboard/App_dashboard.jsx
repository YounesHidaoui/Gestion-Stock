import React from 'react'
import './style/app.css'
import Head from './Head'
import Body from './Body'
import Footer from './Footer'

export default function App_dashboard() {
  return (

    
    <div className='container py-2   '>

      <div className="row">
          <div className="col-11">
          <Body/>
          <Footer/>
          </div>
          <div className="col-1  rounded">
          <Head/>
          </div>
      </div>
    </div>
 
   
  )
}
