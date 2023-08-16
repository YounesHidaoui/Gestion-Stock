import React from 'react'
import Afficher_Fornisseur from './Afficher_Fornisseur'

import Head from '../dashboard/Head'

export default function App_Fournisser() {
  return (

    <div className='container py-2 '>
        
      <div className='row'>
          <div className='col-11'>
            <Afficher_Fornisseur/>
            
          </div>
          <div className='col-1'>
            <Head/>
          </div>
      </div>
    </div>
    
  )
}
