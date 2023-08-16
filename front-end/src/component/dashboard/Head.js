import React from 'react'
import './style/head.css'

import { AiFillHome } from "react-icons/ai";
import {ImUserTie} from 'react-icons/im'
import {MdProductionQuantityLimits} from 'react-icons/md'
import {TfiSupport} from "react-icons/tfi"
import {GrTransaction} from "react-icons/gr"
import {BiCategory} from "react-icons/bi"

import {Link} from "react-router-dom"
import {BsMenuButtonWide} from "react-icons/bs"

export default function Head() {

  return (
    <div className='top   shadow'>
    <div>
    <nav className="navbar bg-white ">
  <div className="container-fluid">
    <div className='para-list'>
    <button className="b navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
      <span className="navbar-toggler-icon"></span>
    </button>
        <ul className='list-nav'>
              <li> 
              <Link to='/dashboard'> <a href=''> 
              <AiFillHome/></a> </Link>
            </li>
              
              <li> 
                <Link to='/products' >
                <a href=''> <MdProductionQuantityLimits/> </a> 
                </Link>
              </li>
              <li> 
                    <Link to='/fournisseur' > 
                    <a href=''><TfiSupport/></a></Link></li>
              <li> 
              <Link to='/movement' >
                <a href=''> <GrTransaction/>  </a>
              </Link>
              </li>
              <li><Link to='/catgories' > 
                <a href=''> <BiCategory/>  </a></Link>
              </li>
              <li>
                <Link to='/profail' >
                  <a href=''> <ImUserTie/>  </a>
                </Link>
              </li>
        </ul>
    </div>
 
    
    <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Gestion de Stock</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
        <ul className='group-list'>
      <li>  <a href='/'>  <AiFillHome/> Page d'accueil </a> </li>
      
      <li> <a href='/products'> <MdProductionQuantityLimits/>  Produits </a> </li>
      <li> <a href='/fournisseur'> <TfiSupport/> Fournisseur </a> </li>
      <li> <a href='/movement'> <GrTransaction/> Mouvements </a> </li>
      <li> <a href='/catgories'> <BiCategory/> Catégories </a> </li>
      <li> <a href='/profail'> <ImUserTie/> Profail </a> </li>
    </ul>
        </ul>
       
      </div>
    </div>
  </div>
</nav>

    </div>
  
    </div>
  )
}
