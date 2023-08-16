import React from 'react'

import Head from '../dashboard/Head'

import Afficher_movement from './Afficher_movement'


export default function App_movement() {
  return (
    <div className='container py-2 '>

      <div className='row'>
        <div className='col-11'>
                <Afficher_movement/>
        </div>
            
        <div className='col-1'>
            <Head/>
            
        </div>
        
      </div>
    </div>
    
  )
}
