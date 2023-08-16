import React from 'react'
import Afficher_Products from './Afficher_Products'
import Head from '../dashboard/Head'

export default function Product_App() {
  return (


    <div className='container py-2'>

        <div className='row'>
            <div className='col-11'>
              <Afficher_Products/>
            </div>
            
            <div className='col-1'>
              <Head/>
            </div>

        </div>
        
    </div>
  )
}
