import React,{useState , useEffect} from 'react'
import axios from 'axios'
import Head from '../dashboard/Head';
import './style/view.css'

export default function Afficher_movement() {
    const [Movement,setMovement] = useState([])
    const[cat,setcat]=useState([])
    const[type,settype]=useState()
    const[date,setdate]=useState()

    const[idUpdate,setidUpdate] = useState();

    const[Move,setMove]=useState({
        
    })
    const[newMove,setnewMove]=useState({
          type: '',
          idPro: null,
          quntite: 0 ,
          data_move: ''
    })


   
    function Handel_Catgorie(){
        fetch('http://localhost:3001/all_products').then(response =>{return response.json()}).then(data =>{setcat(data)}).catch(err=>{console.log(err)})
     }

    function afficher_movement(){
        fetch('http://localhost:3001/Movement').then(response =>{return response.json() }).then(data=>{setMovement(data)}).catch(err=>{console.log(err)})
    }
   
    async function Ajoute_Movement(){
        
        await axios.post('http://localhost:3001/add_Movement',{
            type:Move.type,
            idPro:Move.idPro,
            quntite:Move.quntite,
            data_move:Move.data_move
        }).then(()=>alert('Votre Movement Bien Ajoute')).catch((err)=>{
            console.log(err)
        })
        setMovement([...Movement,Move])
    }

   async function update_movement(){
    setMovement(Movement.map((e)=>{
      return e.idMov == idUpdate ?{
      type:newMove.type ,
      idPro:newMove.idPro,
      quntite:newMove.quntite,
      data_move:newMove.data_move
      
    }:e
    }))

        await axios.put('http://localhost:3001/movement_update',{
          id:idUpdate,
          type: newMove.type,
          idPro: newMove.idPro,
          quntite: newMove.quntite ,
          data_move: newMove.data_move
        }).then(()=>alert('Votre mise a jour ete bien!'))
    }

    function Handel_movement(e){
        setMove(prev=>({...prev,[e.target.name]:e.target.value}))
    }
  function handel_updatemovement(e){
    setnewMove(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  async function delete_movement(id){
    setMovement(Movement.filter((e)=>{return e.idMov !=id
    }))
    await axios.delete(`http://localhost:3001/deleteMovement/${id}`).then(()=>alert(id)).catch((err)=>console.log(err))
 }

 function recherch(){
  setMovement(Movement.filter((e)=>e.type==type || e.data_move == date))
 }

 function find_movement(ID){
  setnewMove(Movement.find((e)=>e.idMov == ID))
  setidUpdate(ID)
 }


    useEffect(() => {
        afficher_movement()
        Handel_Catgorie()
    }, [])

  return (
    <div className='fluid'>
    <div className='container py-4  '>
        <div className='row banar bg-white  shadow-lg '>
        <div className='col'> 
        <input className='form-control shadow' 
         type='text' placeholder='recherch par type' onChange={(e)=>settype(e.target.value)} /> 
         </div>
        <div className='col'>
        <input className='form-control shadow'  type='date' placeholder='recherch par Date' onChange={(e)=>setdate(e.target.value)} />
        </div>
        <div className='col'>
            <button className='btn btn-dark' onClick={recherch}>
                recherch 
            </button>
        </div>
        <div className='col'>
            <button className='btn btn-info' type="button" 
             data-bs-toggle="modal" data-bs-target="#exampleModal">
                Ajoute Movement
            </button>
        </div>
    </div>
    </div>
    <table className="table bg-light  shadow-lg mt-2 text-center ">
        <thead>
            <tr>
            <th scope="col">#</th>
            
            <th scope="col">Type</th>
            
            <th scope="col">quntite</th>
            <th scope='col' > Designateur</th>
            <th scope="col"> Date</th>
            <th scope="col"> 
            Operations
            </th>
            </tr>
        </thead>
        <tbody>
        {(Movement.length > 0 )?Movement.map((e,i)=>
            
            <tr key={i}>
            <th scope="row">{i+1}</th>
            <td> {e.type} </td>    
            <td>{e.quntite}</td>
            <td> {e.Designateur} </td>
            <td> {e.data_move} </td>
           
            <td>
            <button className='btn btn-light m-1' 
             onClick={()=>delete_movement(e.idMov)} > 
           Suppremer </button>
            <button className='btn btn-info m-1'
              type="button" 
            data-bs-toggle="modal" onClick={()=>find_movement(e.idMov)}data-bs-target="#exampleModal1"> Mise a Jour </button>
            </td>
            </tr>
            
            
            ):<h2 className=''> Data is Vide </h2>
        }
           
            
        </tbody>
    </table>
        
        

    <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Mise a Jour </h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className="row g-3" onSubmit={(e)=>e.preventDefault()}>
  <div className="col-md-4">
    <label for="validationDefault01" className="form-label">Type</label>
    <input type="text" className="form-control" value={newMove.type}  id="validationDefault01" name='type' onChange={handel_updatemovement}  required />
  </div>
  <div className="col-md-4">
    <label for="validationDefault02" className="form-label">Quntite</label>
    <input type="text" name='quntite'
    className="form-control" id="validationDefault02" value={newMove.quntite}  onChange={handel_updatemovement}  required />
  </div>
  
  <div className="col-md-6">
    <label for="validationDefault03" className="form-label">Date</label>
    <input type="date" name='data_move' className="form-control" id="validationDefault03" onChange={handel_updatemovement} value={newMove.data_move } required />
  </div>
  
  <div className="col-md-3">
    <label for="validationDefault04" className="form-label">Produit</label>
    <select className="form-select" name='idPro'
    onChange={handel_updatemovement} id="validationDefault04" required >
      
      <option selected  value="">Choose...</option>
     {cat.length>0?cat.map((e)=> 
     <>
     <option value={e.id}>{e.Designateur}</option>
     </>
     
     
     ):<option selected disabled value="">Choose...</option>
     }
      
    </select>
  </div>
 
  <div className="col-12">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" value="" id="invalidCheck2" required />
      <label className="form-check-label" for="invalidCheck2">
        Agree to terms and conditions
      </label>
    </div>
  </div>
  
</form>
    </div>
      <div className="modal-footer">
      <button className="btn btn-dark" 
    onClick={()=>update_movement()} >Mise a Jour</button>
      </div>
    </div>
  </div>
    </div>


    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Ajoute un Movement </h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className="row g-3" onSubmit={(e)=>e.preventDefault()}>
  <div className="col-md-4">
    <label for="validationDefault01" className="form-label">Type</label>
    <input type="text" className="form-control" id="validationDefault01" name='type' onChange={Handel_movement}  required />
  </div>
  <div className="col-md-4">
    <label for="validationDefault02" className="form-label">Quntite</label>
    <input type="text" name='quntite'
    className="form-control" id="validationDefault02" onChange={Handel_movement}  required />
  </div>
  
  <div className="col-md-6">
    <label for="validationDefault03" className="form-label">Date</label>
    <input type="date" name='data_move' className="form-control" id="validationDefault03" onChange={Handel_movement} required />
  </div>
  
  <div className="col-md-3">
    <label for="validationDefault04" className="form-label">Produit</label>
    <select className="form-select" name='idPro'
    onChange={Handel_movement} id="validationDefault04" required >
      
      <option selected  value="">Choose...</option>
     {cat.length>0?cat.map((e)=> 
     <>
     <option value={e.id}>{e.Designateur}</option>
     </>
     
     
     ):<option selected disabled value="">Choose...</option>
     }
      
    </select>
  </div>
 
  <div className="col-12">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" value="" id="invalidCheck2" required />
      <label className="form-check-label" for="invalidCheck2">
        Agree to terms and conditions
      </label>
    </div>
  </div>
  
</form>
    </div>
      <div className="modal-footer">
      <button className="btn btn-dark" 
    onClick={()=>Ajoute_Movement()} >Ajoute Movement</button>
      </div>
    </div>
  </div>
    </div>
    </div>


  )
}
