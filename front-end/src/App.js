import React from 'react'
import App_dashboard from './component/dashboard/App_dashboard'
import Product_App from './component/Product/Product_App'
import App_movement from './component/Movement/App_movement'
import App_Fournisser from './component/Fournisser/App_Fournisser'
import App_Categorie from './component/Categorie/App_Categorie'
import Login from './component/Profail/Login'

import {BrowserRouter,Routes, Route  } from 'react-router-dom'

export default function App() {


  return(
    <BrowserRouter>
      <Routes>
          <Route path='/dashboard' element={<App_dashboard/>} />
          <Route path='/products' element={<Product_App/>} />
          <Route path='/movement' element={<App_movement/>} />
          <Route path='/fournisseur' element={<App_Fournisser/>} />
          <Route path='/Catgories' element={<App_Categorie/>} />
          <Route path='/' element={<Login/>} />
      </Routes>

    </BrowserRouter>

  )
}