import React, {useState,useEffect} from 'react'
import './style/table.css'
import axios from 'axios'

export default function Afficher_Products() {
    const[nom,setnom]=useState()
    const[date,setdate]=useState()
    const[products,setproducts] =useState([]);
    const[Categorie,setCategorie] =useState([]);
    const[idUpdate , setidUpdate]=useState()
    const [product, setproduct ] = useState({
    })
    const[update_product,setupdate_product]=useState({
    })
  
   
    async function Ajoute(e){
      
      await axios.post('http://localhost:3001/addProduct',
      {
       Designateur:product.Designateur,
       prix:product.prix,
       quntite_product:product.quntite_product,
       date:product.date,
       idcategorie:product.idcategorie,
       state:product.state
      }
       ).then(()=>alert('Product bien Ajoute'))
        
       setproducts([...products,product])
    }
   

    function update_Product(){
        console.log(idUpdate)

      setproducts(products.map((e)=>{
        console.log(e.id);
        return e.id == idUpdate ?{
        Designateur:update_product.Designateur ,
        prix:update_product.prix,
        quntite_product:update_product.quntite_product,
        date:update_product.date,
        idcategorie:update_product.idcategorie,
        state:update_product.state
      }:e
      }))


      axios.put(`http://localhost:3001/updateProduct/`,{
        id:idUpdate,
        Designateur:update_product.Designateur,
        prix:update_product.prix,
        quntite_product:update_product.quntite_product,
        date:update_product.date,
        idcategorie:update_product.idcategorie,
        state:update_product.state
      }).then(()=>alert('Votre mise a jour ete bien!'))
    }
  
    function Handel_product(e){
        setproduct(prev=>({...prev,[e.target.name]:e.target.value}))
    }
  function handel_updateProduct(e){
    setupdate_product(prev=>({...prev,[e.target.name]:e.target.value}))
  }
  
     function Handel_Catgorie(){
       fetch('http://localhost:3001/Catgorie').then(response =>{return response.json()}).then(data =>{setCategorie(data)}).catch(err=>{console.log(err)})
    }
    function Afficher(){
         fetch('http://localhost:3001/all_products').then(response =>{return response.json() }).then(data=>{setproducts(data)}).catch(err=>{console.log(err)})
    }

     async function deleteProduct(id){
      
       await axios.delete(`http://localhost:3001/deleteProduct/${id}`).then(()=>alert('Suppreme Complet'))

        setproducts(products.filter((e)=>{
            return e.id!=id
        }))
    }
    function recherch(){
      setproducts(products.filter((e)=>e.Designateur==nom || e.date == date))
     }

     function update_element(ID){
      
      setupdate_product(products.find((e)=>e.id==ID))
      setidUpdate(ID)
      
     }
     
     function calcule_quntite(){
      
     }
    useEffect(() => {
        Afficher()
        Handel_Catgorie()
    }, []);
  return (                 
    <div className=''>
      <div className=' container py-4'> 
          <div className='row banar bg-white shadow-lg '>
              <div className='col '> 
              <input className='form-control shadow' 
              type='text' placeholder='recherch par Nom' onChange={(e)=>setnom(e.target.value)} /> 
              </div>
              <div className='col'>
              <input className='form-control shadow' onChange={(e)=>setdate(e.target.value)}  type='date' placeholder='recherch par Nom' />
              </div>
              <div className='col'>
                  <button className='btn btn-dark' onClick={recherch}>
                      Reacherch
                  </button>
              </div>
              <div className='col'>
                  <button className='btn btn-info' type="button" 
                  data-bs-toggle="modal" data-bs-target="#exampleModal">
                      Ajoute un Produit
                  </button>
              </div>
          </div>
    </div>

    
    <table className="table bg-light shadow-lg mt-2 text-center ">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Quntite</th>
            <th scope="col"> Prix</th>
            <th scope="col">State</th>
            <th scope="col">Date Ajoute</th>
            <th scope="col"> 
            Operations
            </th>
            </tr>
        </thead>
        <tbody>
        {(products.length > 0 )?products.map((e,i)=>
            
            <tr key={i}>
            <th scope="row">{i+1}</th>
            <td>{e.Designateur}</td>
            <td> {e.quntite_product} </td>
            <td> {e.prix} </td>
            <td> {e.state} </td>
            <td>{e.date}</td>
            <td>
            <button className='btn btn-light m-1' 
             onClick={()=>deleteProduct(e.id)} > 
           Suppremer </button>
            <button className='btn btn-info m-1'
              type="button" 
            data-bs-toggle="modal" onClick={()=>update_element(e.id)}data-bs-target="#exampleModal1"> Mise a Jour </button>
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
        <h1 className="modal-title fs-5" id="exampleModalLabel">la Mise a Jour</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
        

     
      <div className="modal-body">
      <form className="row g-3" onSubmit={(e)=>e.preventDefault()}>
  <div className="col-md-4">
    <label for="validationDefault01" className="form-label">Designateur</label>
    <input type="text" className="form-control" id="validationDefault01" name='Designateur' value={update_product.Designateur}   onChange={handel_updateProduct}   required />
  </div>
  <div className="col-md-4">
    <label for="validationDefault02" className="form-label">Prix</label>
    <input type="text" name='prix'
    className="form-control"  
     id="validationDefault02" value={update_product.prix}  onChange={handel_updateProduct}  required />
  </div>
  <div className="col-md-4">
    <label for="validationDefaultUsername" className="form-label" >Quntite</label>
    <div className="input-group">
      <input type="text" name='quntite_product' value={update_product.quntite_product}    onChange={handel_updateProduct} className="form-control" id="validationDefaultUsername" 
       aria-describedby="inputGroupPrepend2" required />
    </div>
  </div>
  <div className="col-md-6">
    <label for="validationDefault03" className="form-label">Date</label>
    <input type="date" name='date' className="form-control" value={update_product.date} id="validationDefault03" onChange={handel_updateProduct} required />
  </div>
  <div className="col-md-3">
    <label for="validationDefault04" className="form-label">Categorie</label>
    <select className="form-select"  name='idcategorie'
    onChange={handel_updateProduct} id="validationDefault04" required >
      <option selected  value={update_product.idcategorie}>Choose...</option>

     {Categorie.length>0?Categorie.map((e)=> 
     
     
     <option value={e.value}>{e.name}</option>
     
     ):<option selected disabled value="">Choose...</option>
     }
      
    </select>
  </div>
  <div className="col-md-3">
    <label for="validationDefault05" className="form-label">State</label>
    <input type="text" name='state' value={update_product.state}  onChange={handel_updateProduct} className="form-control" id="validationDefault05" required />
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
    onClick={()=>update_Product()} >Update Produit</button>
      </div>
    </div>
  </div>
</div>



    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Ajouter infos produit</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className="row g-3" onSubmit={(e)=>e.preventDefault()}>
  <div className="col-md-4">
    <label for="validationDefault01" className="form-label">Designateur</label>
    <input type="text" className="form-control" id="validationDefault01" name='Designateur' onChange={Handel_product}  required />
  </div>
  <div className="col-md-4">
    <label for="validationDefault02" className="form-label">Prix</label>
    <input type="text" name='prix'
    className="form-control" id="validationDefault02" onChange={Handel_product}  required />
  </div>
  <div className="col-md-4">
    <label for="validationDefaultUsername" className="form-label" >Quntite</label>
    <div className="input-group">
      <input type="text" name='quntite_product' onChange={Handel_product} className="form-control" id="validationDefaultUsername" 
       aria-describedby="inputGroupPrepend2" required />
    </div>
  </div>
  <div className="col-md-6">
    <label for="validationDefault03" className="form-label">Date</label>
    <input type="date" name='date' className="form-control" id="validationDefault03" onChange={Handel_product} required />
  </div>
  <div className="col-md-3">
    <label for="validationDefault04" className="form-label">Categorie</label>
    <select className="form-select" name='idcategorie'
    onChange={Handel_product} id="validationDefault04" required >
      
      <option selected  value="">Choose...</option>
     {Categorie.length>0?Categorie.map((e)=> 
     <>
     <option value={e.value}>{e.name}</option>
     </>
     
     
     ):<option selected disabled value="">Choose...</option>
     }
      
    </select>
  </div>
  <div className="col-md-3">
    <label for="validationDefault05" className="form-label">State</label>
    <input type="text" name='state' onChange={Handel_product} className="form-control" id="validationDefault05" required />
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
    onClick={()=>Ajoute()} >Ajoute Produit</button>
      </div>
    </div>
  </div>
    </div>



    </div>


  )
}
