import axios from 'axios';
import React ,{useState,useEffect} from 'react'
import './style/View.css'

export default function Afficher_Fornisseur() {
    const [allfournisseur,setallfournisseur] = useState([])
    const[idUpdate,setidUpdate] = useState();
    const[name,setname]=useState()
    const[ville,setville]=useState()

    const [Fourinsseur,setFourinsseur] = useState({

        name:'',
        email:'',
        country:'',
        date:'',
        id:idUpdate

    })
    const [newFourinsseur,setnewFourinsseur] = useState({
        name:'',
        email:'',
        country:'',
        date:''
    })


   
    function recherch(){
      setallfournisseur(allfournisseur.filter((e)=>e.country==ville || e.name == name))
    }

    function afficher_fournisseur(){
        fetch('http://localhost:3001/fornisseur').then(response =>{return response.json() }).then(data=>{
            setallfournisseur(data)}).catch(err=>{console.log(err)})
    }
    async function Ajoute_Fournisseur(){
       
        await axios.post('http://localhost:3001/fornisseur_Ajoute',{
            name:Fourinsseur.name,
            email:Fourinsseur.email,
            country:Fourinsseur.country,
            date:Fourinsseur.date
    })
    setallfournisseur([...allfournisseur,Fourinsseur])
    }
    async function delete_fournisseur(id){
        await axios.delete(`http://localhost:3001/fornisseur_delete/${id}`).then(()=>alert("Fournisseur bien Suppremer")).then(alert('votre fournisser est suppreme')
        ).then(
            setallfournisseur(allfournisseur.filter((e)=>e.idSupplier!=id))
        )
    }

    async function Update_Fourinsseur(){
        await axios.put('http://localhost:3001/fornisseur_update',{
            name:newFourinsseur.name,
            email:newFourinsseur.email,
            country:newFourinsseur.country,
            date:newFourinsseur.date,
            id:idUpdate
        }).then(setallfournisseur(allfournisseur.map((e)=>{
            return e.idSupplier == idUpdate?{
            name:newFourinsseur.name,
            email:newFourinsseur.email,
            country:newFourinsseur.country,
            date:newFourinsseur.date,
            id:idUpdate
            }:e
        }))).then(alert('bien mise a jour '))
    }
    function Handel_fournisseur(e){
        setFourinsseur((Four)=>({...Four,[e.target.name]:e.target.value}))
    }
    function Handel_updatefournisseur(e){
        setnewFourinsseur((four)=>({...four,[e.target.name]:e.target.value}))
    }

    function update_for(ID){
      setnewFourinsseur(allfournisseur.find((e)=>e.idSupplier == ID))
      setidUpdate(ID)
    }

    useEffect(() => {
        afficher_fournisseur()
        
    }, [])
  return (
    <div className='fluid'>
        
      <div className='container py-4 '>
         
    <div className='row bg-white banar shadow-lg '>
        <div className='col'> 
        <input className='form-control shadow' 
         type='text' placeholder='recherch par name'onChange={(e)=>setname(e.target.value)}  /> </div>
        
        
        <div className='col'>
        <input className='form-control shadow'  type='text' placeholder='recherch par Ville'  onChange={(e)=>setville(e.target.value)}/>
        </div>
        <div className='col'>
            <button className='btn btn-dark' onClick={recherch}>
                recherch 
            </button>
        </div>
        <div className='col'>
            <button className='btn btn-info' type="button" 
             data-bs-toggle="modal" data-bs-target="#exampleModal">
                Ajoute fournisseur
            </button>
        </div>
    </div>
    </div> 
    <table className="table bg-light shadow-lg mt-2 text-center ">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">email</th>
            
            <th scope="col">Ville</th>
            <th scope="col"> Date</th>
            <th scope="col"> 
            Operations
            </th>
            </tr>
        </thead>
        <tbody>
        {(allfournisseur.length > 0 )?allfournisseur.map((e,i)=>
            
            <tr key={i}>
            <th scope="row">{i+1}</th>
            <td>{e.name}</td>
            <td> {e.email} </td>    
            <td>{e.country}</td>
            <td> {e.date} </td>
            <td>
            <button className='btn btn-light m-1' 
             onClick={()=>delete_fournisseur(e.idSupplier)} > 
           Suppremer </button>
            <button className='btn btn-info m-1'
              type="button" 
            data-bs-toggle="modal" onClick={()=>update_for(e.idSupplier)}data-bs-target="#exampleModal1"> Mise a Jour </button>
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
        <h1 className="modal-title fs-5" id="exampleModalLabel">Mise a Jour de Fourinsseur </h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className="row g-3" onSubmit={(e)=>e.preventDefault()}>
  <div className="col-md-6">
    <label for="validationDefault01" className="form-label">Nom</label>
    <input type="text" value={newFourinsseur.name} name='name' className="form-control" id="validationDefault01"  onChange={Handel_updatefournisseur}  required />
  </div>
  <div className="col-md-6">
    <label for="validationDefault02" className="form-label">Email</label>
    <input type="email"   name='email' value={newFourinsseur.email}
    className="form-control" id="validationDefault02" onChange={Handel_updatefournisseur}  required />
  </div>
  
  <div className="col-md-6">
    <label for="validationDefault03"  className="form-label">country</label>
    <input type="text"  name='country' value={newFourinsseur.country} className="form-control" id="validationDefault03" onChange={Handel_updatefournisseur} required />
  </div>
  
  <div className="col-md-6">
    <label for="validationDefault04" className="form-label">Date</label>
    <input type="date"  name='date'  value={newFourinsseur.date} className="form-control" id="validationDefault03" onChange={Handel_updatefournisseur} required />
    
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
    onClick={()=>Update_Fourinsseur()} >Mise a Jour</button>
      </div>
    </div>
  </div>
    </div>

    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Ajoute un Fourinsseur </h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className="row g-3" onSubmit={(e)=>e.preventDefault()}>
  <div className="col-md-6">
    <label for="validationDefault01" className="form-label">name</label>
    <input type="text" name='name' className="form-control" id="validationDefault01"  onChange={Handel_fournisseur}  required />
  </div>
  <div className="col-md-6">
    <label for="validationDefault02" className="form-label">email</label>
    <input type="email" name='email'
    className="form-control" id="validationDefault02" onChange={Handel_fournisseur}  required />
  </div>
  
  <div className="col-md-6">
    <label for="validationDefault03" className="form-label">country</label>
    <input type="text" name='country' className="form-control" id="validationDefault03" onChange={Handel_fournisseur} required />
  </div>
  
  <div className="col-md-6">
    <label for="validationDefault04" className="form-label">Date</label>
    <input type="date" name='date' className="form-control" id="validationDefault03" onChange={Handel_fournisseur} required />
    
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
    onClick={()=>Ajoute_Fournisseur()} >Ajoute Fourinsseur</button>
      </div>
    </div>
  </div>
    </div>
        
        
    </div>
  )
}
