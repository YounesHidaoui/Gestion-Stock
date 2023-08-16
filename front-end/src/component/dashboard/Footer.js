import React  from 'react'
import { useState , useEffect } from 'react'

import './style/box.css'

import Chart from 'react-apexcharts'
import axios from 'axios'

export default function Footer() {
 
  const [state, setstate] = useState(
    {
    options: {
              chart: {
                id: "basic-bar"
              },
              xaxis: {
                categories:[]
              }
            },
    series: [
              {
              name:'products',
              data:[]
              }
            ]
  })

  const[state1,setstate1]=useState([])
  const[total1,settotal1]=useState();

  function getData(){
    fetch('http://localhost:3001/productByCatg').then(response =>{return response.json()}).then(data=>{
      var cat = []
      var d = []
      d =data.map((e)=>e.Q);
      cat = data.map((e)=>e.categoriesName) ;
      console.log(cat);

      setstate(
        {...state,options:
          {xaxis:{categories:cat}}
          ,series:[{data:d}]
        }
          )

      

    }).catch(err => console.log(err))
  }
 async function type_by_quntite(){
    await axios.get('http://localhost:3001/type').then(
      response=>{return response.json()}
    ).then(data=>{
      // var cat = []
      // var d = []
      // d = data.map((e)=>e.quntite);
      // cat = data.map((e)=>e.type) ;
      setstate1(data)
    })
 }
  function total_cat(){
   fetch('http://localhost:3001/total_cat').then(
    response=>{return response.json() }
  ).then(data=>{
  settotal1(data[0].total);
  })
}
 
useEffect(() => {
  type_by_quntite()
  
  getData()
  total_cat()
}, []);
  return (
<>
<div class="row">
  
    <div class=" col  m-2 bg shadow-lg  rounded " >
    <h3>
    Categories
     
    
    </h3>
    <div className='bar'>
    <h2>  {total1} </h2>
    </div>
    
    </div>
    <div class="col  bg shadow-lg m-2 rounded ">
        
        <h3>Quntite par Categorie</h3>
        <div className='chart'>
        <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="300"
              height='250'
              color='white'
            />
        </div>
       
       
     </div>
    
  </div>
</>
   
  )
}
