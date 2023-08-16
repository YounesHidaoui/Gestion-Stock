import React,{useState ,useEffect} from 'react'

export default function ModalUpdate(props) {

    const[Element,setElement]=useState({})


    useEffect(() => {
        setElement(props.ELement.find((e)=>e.id == props.id));
    }, []);
    
    console.log(Element);

  return (
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
      <input type="text" className="form-control" id="validationDefault01" name='Designateur'  onChange={props.handel_updateProduct}   required />
    </div>
    <div className="col-md-4">
      <label for="validationDefault02" className="form-label">Prix</label>
      <input type="text" name='prix'
      className="form-control"  
       id="validationDefault02" onChange={props.handel_updateProduct}  required />
    </div>
    <div className="col-md-4">
      <label for="validationDefaultUsername" className="form-label" >Quntite</label>
      <div className="input-group">
        <input type="text" name='quntite_product'   onChange={props.handel_updateProduct} className="form-control" id="validationDefaultUsername" 
         aria-describedby="inputGroupPrepend2" required />
      </div>
    </div>
    <div className="col-md-6">
      <label for="validationDefault03" className="form-label">Date</label>
      <input type="date" name='date'  className="form-control" id="validationDefault03" onChange={props.handel_updateProduct} required />
    </div>
    <div className="col-md-3">
      <label for="validationDefault04" className="form-label">Categorie</label>
      <select className="form-select"  name='idcategorie'
      onChange={props.handel_updateProduct} id="validationDefault04" required >
        <option selected  value="">Choose...</option>
  
       {props.Categorie.length>0?props.Categorie.map((e)=> 
       
       
       <option value={e.value}>{e.name}</option>
       
       ):<option selected disabled >Choose...</option>
       }
        
      </select>
    </div>
    <div className="col-md-3">
      <label for="validationDefault05" className="form-label">State</label>
      <input type="text" name='state'   onChange={props.handel_updateProduct} className="form-control" id="validationDefault05" required />
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
      onClick={()=>props.update_Product()} >Update Produit</button>
        </div>
      </div>
    </div>
      </div>
  
  )
}
