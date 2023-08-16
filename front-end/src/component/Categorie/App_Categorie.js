import React from 'react'
import Head from '../dashboard/Head'
import Crud_categorie from './Crud_categorie'


export default function App_Categorie() {
  return (


    <div className='container'>
            
        <div className='row'>
            <div className='col-11'>
            <Crud_categorie/>
            
            </div>
            <div className='col-1'>
            
            <Head/>
            </div>
        </div>
    </div>
  )
}
