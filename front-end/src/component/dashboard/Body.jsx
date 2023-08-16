import React,{ useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import './style/box.css'

 import Chart from 'react-apexcharts'

export default function Body() {
  const [movments, setmovments] = useState();
  const [produit , setproduit] = useState();
  const [products_catg , setproducts_catg] = useState()
  const [Move , setMove] = useState([])
  const [Fournisseur , setFournisseur] = useState()
  const [state,setstate]=useState({
      series: [],
      labels: []
  })
  const nav = useNavigate()

function products(){
  nav('/products')
}
function movment(){
  nav('/movement')
}
function Fournisse(){
  nav('/fournisseur')
}

function viewmovments()
{
  fetch('http://localhost:3001/movments').then(response =>{return response.json()}).then(data=>{
    setmovments(data[0].total) 
  }).catch(err=>console.log(err))
}

function Product(){
  fetch('http://localhost:3001/products').then(response=>{return response.json()}).then(data=>{
    setproduit(data)
    console.log(data);
  }).catch(err=>console.log(err))

}
//produits_catg

function Produit_catg(){
  fetch('http://localhost:3001/produits_catg').then(response=>{return response.json()}).then(data=>{
    setproducts_catg(data)
    var d = []

    d = data.map((e)=>{return e.value}) ;
    var l = []
    l = data.map((e)=>{return e.name}) ;
   
    setstate({...state,series:d ,labels:l})
  }).catch(err=>console.log(err))
}

function Movement(){
  fetch('http://localhost:3001/move').then(response=>{return response.json()}).then(data=>{
    setMove(data)

  }).catch(err=>console.log(err))
}

function CountsetFournisseur(){
  fetch('http://localhost:3001/Fourinsseur').then(response=>{return response.json()}).then(data=>{
    setFournisseur(data[0].total)
  }).catch(err=>console.log(err))
}

console.log(Move);

useEffect(() => {
  viewmovments();
  Product();
  Produit_catg();
  Movement();
  CountsetFournisseur();
}, []);
  
  return (
    <>
  <div className="row">
    <div className=" col-xl-5  m-2 bg shadow-lg rounded" >
      
        <h2> Produits </h2>
        
        <Chart options={state} series={state.series} type="donut" width="380" /> 
       
     </div>

    <div className="col-sm-3 col    shadow m-2 bg  rounded"
     >
        <h2> 
        Fournisseur 
        </h2>
        <div className='bar'>
           <h2>{Fournisseur} </h2> 
        </div>
    </div>

    <div className="col  bg shadow-lg m-2 rounded " >
    <h2> Mouvements </h2>   
      <div className="bar">
      <h2> {movments} </h2> 

      </div>
    </div>

  </div>
        
    </>
  )
}
