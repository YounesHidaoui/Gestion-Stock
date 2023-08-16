import React,{useState , useEffect} from 'react'
import ModelUpdate from './ModelUpdate'
import axios from "axios"
import '../Movement/style/view.css'

export default function Crud_categorie() {

    const[categories,setcategories] = useState([])
    const[categorie , setcategorie] =useState({})
    const[date,setdate]=useState()

    
    const[newcategorie , setnewcategorie] =useState({})
    const[idUpdate,setidUpdate] = useState();
    const[name,setname] = useState();

   

    function read_data(){
            fetch('http://localhost:3001/all_Catgories').then(response=>{return response.json()}).then(data=>{setcategories(data)}).catch(err=>{console.log(err)})
           
    }

    console.log( categories )
    async function delete_categories(id){

        await axios.delete(`http://localhost:3001/suppreme_categorie/${id}`).then(alert('votre categorie bien suppreme')).then(
         setcategories(categories.filter((e)=>e.idcategorie != id))
        )
    }


    function handel_categorie(e){

        setcategorie((cat)=>({...cat,[e.target.name]:e.target.value}))
    }
    function handel_updatecategorie(e){
      setnewcategorie((cat)=>({...cat,[e.target.name]:e.target.value}))
    }
    async function create_Categorie(){
        await axios.post('http://localhost:3001/create_categorie',{
            categoriesName: categorie.categoriesName ,
            Date:categorie.Date
        }

        ).then(
            alert('Votre categorie bien ajoute')
            
        ).then(setcategories([...categories,categorie]))
    }

    async function update_Categorie(){
      console.log(newcategorie)
      await axios.put('http://localhost:3001/update_categories',{
        categoriesName: newcategorie.categoriesName ,
        Date: newcategorie.Date,
        idcategorie:idUpdate
      }
      ).then(
        setcategories(categories.map((e)=>{
        return e.idcategorie == idUpdate ?{
          categoriesName:newcategorie.categoriesName,
          Date: newcategorie.Date
        }:e
        }))
      )
    }

    function recherche(){
      setcategories(categories.filter((e)=>e.categoriesName == name || e.Date == date))
    }
    
    function update_cat(ID){
      setnewcategorie(categories.find((e)=>e.idcategorie == ID))
      setidUpdate(ID)
      
    }
   
    useEffect(() => {
        read_data()
    }, []);
  return (
    <div>
         <div className='container py-4 '>
         
         <div className=' row bg-white banar shadow-lg '>
             <div className='col-md '> 
             <input className='form-control shadow' 
              type='text' placeholder='recherch par Nom' onChange={(e)=>setname(e.target.value)} /> </div>
            
             <div className='col-md  '>
             <input className='form-control shadow'  type='Date' placeholder='recherch par Date' onChange={(e)=>setdate(e.target.value)} />
             </div>
             <div className="col-md">
             <button className='btn btn-dark' onClick={recherche}>
                     recherch 
                 </button>
             </div>
             <div className='col-md'>
                 <button className='btn btn-info' type="button" 
                  data-bs-toggle="modal" data-bs-target="#exampleModal">
                     Ajoute un categorie
                 </button>
             </div>
         </div>
         </div> 
         <table className="table bg-light shadow-lg mt-2 text-center ">
             <thead>
                 <tr>
                 <th scope="col">#</th>
                 <th scope="col">Nom</th>
                 <th scope="col"> Date</th>
                 <th scope="col"> 
                 Operations
                 </th>
                 </tr>
             </thead>
             <tbody>
             {(categories.length > 0 )?categories.map((e,i)=>
                 
                 <tr key={i}>
                 <th scope="row">{i+1}</th>
                
                 <td>{e.categoriesName}</td>
                 <td> {e.Date} </td>
                 <td>
                 <button className='btn btn-light m-1' 
                  onClick={()=>delete_categories(e.idcategorie)} > 
                Suppremer </button>
                 <button className='btn btn-info m-1'
                   type="button" 
                 data-bs-toggle="modal" onClick={()=>update_cat(e.idcategorie)}data-bs-target="#exampleModal1"> Mise a Jour </button>
                 </td>
                 </tr>
                 
                 
                 ):<h2 className=''> Data is Vide </h2>
             }
                
                 
             </tbody>
         </table>
         

<ModelUpdate handel_updatecategorie={handel_updatecategorie} update_Categorie={update_Categorie} Element={newcategorie} />
           
    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Ajoute un Categorie </h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className="row g-3" onSubmit={(e)=>e.preventDefault()}>
  <div className="col-md-8">
    <label for="validationDefault01" className="form-label">Nom Categorie</label>
    <input type="text" name='categoriesName' className="form-control" id="validationDefault01"  onChange={handel_categorie}  required />
  </div>
  <div className="col-md-8">
    <label for="validationDefault02" className="form-label">Date</label>
    <input type="date" name='Date'
    className="form-control" id="validationDefault02" onChange={handel_categorie}  required />
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
    onClick={()=>create_Categorie()} >Ajoute Categorie</button>
      </div>
    </div>
  </div>
    </div>
    </div>
  )
}
