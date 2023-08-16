import React,{useState} from 'react'

export default function ModelUpdate(props) {

 

  return (
    <div>
 <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Mise a jour de Categorie </h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        <form className="row g-3" onSubmit={(e)=>e.preventDefault()}>
    <div className="col-md-8">
      <label for="validationDefault01" className="form-label">Nom Categorie</label>
      <input type="text" value={props.Element.categoriesName} onChange={props.handel_updatecategorie}  name='categoriesName'  className="form-control" id="validationDefault01"    required />
    </div>
    <div className="col-md-8">
      <label for="validationDefault02" className="form-label">Date</label>
      <input type="date" value={props.Element.Date} onChange={props.handel_updatecategorie}   name='Date' 
      className="form-control" id="validationDefault02"  required />
    </div>
    
    <div className="col-12">
      <div className="form-check">
        <input className="form-check-input"  type="checkbox" value="" id="invalidCheck2" required />
        <label className="form-check-label" for="invalidCheck2">
          Agree to terms and conditions
        </label>
      </div>
    </div>
    
  </form>
      </div>
        <div className="modal-footer">
        <button className="btn btn-dark" 
      onClick={()=>props.update_Categorie()} >Mise a Jour </button>
        </div>
      </div>
    </div>
      </div>  </div>
  )
}
