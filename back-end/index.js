import express from "express" 
import cors from "cors"
import mysql from "mysql"
import bcrypt from "bcrypt"




const App = express() ;
App.use(express.json())
App.use(cors());


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "younes",
    database: "gestion_stock"
  });

  /*const idclient = req.body.idclient 
  const firstname = req.body.firstname 
  const lastname = req.body.lastname 
  const Country = req.body.Country 
  */

// count for all products 
App.get('/movments',function(req,res){
    con.query('SELECT count(*) as total   FROM `movement`', function(err , result,fileds){
        if (err) {
          console.log(err);
        }else{
          res.send(result)
        }
       
      })
  });

  // Products of all categorie 

  App.get('/products',function(req,res){
    con.query('select categoriesName, count(idPro) as value  from Product inner join categorie on  Product.idcategorie = categorie.idcategorie  group by categoriesName ', function(err,result){
      if(err){
        console.log(err);
      }else{
        res.send(result)
      }
    })
  })


App.get('/produits_catg', function(req,res){
  con.query('select  quntite_product as value , Designateur as name from product group by Designateur ',function(err,result){
    if(err){
      console.log(err);
    }else{
      res.send(result)
    }
  })
})

// get Numbre for all Move
App.get('/move', function(req,res){
  con.query(`select * , DATE_FORMAT(data_move, '%Y-%m-%d') as date from movement  limit 3`,function(err,result){
    if(err){
      console.log(err);
    }else{
      res.send(result)
    }
  })
})

// get Supplier
App.get('/Fourinsseur',function(req,res){
  con.query('select count(*) as total  from supplier', function(err,result){
    if(err){
      console.log(err);
    }else{
      res.send(result)
    }
  })
})

// products by categorie 
App.get('/productByCatg',function(req,res){
  con.query('select Designateur as name ,sum(quntite_product ) as Q, categoriesName from product inner join categorie on product.idcategorie= categorie.idcategorie group by  categoriesName',function(err,result){
    if(err){
      console.log(err);
    }else{
      res.send(result)
    }
  })
})

// Afficher all Products 

App.get('/all_products',function(req,res){
  con.query(`select idPro as id , Designateur  , prix , quntite_product  , DATE_FORMAT(date, '%Y-%m-%d') as date , state from product `,function(err,result){
    if(err){
      console.log(err);
    }else{
      res.send(result)
    }
  })
})

App.get('/Catgorie',function(req,res){
  con.query('select categoriesName as name , idcategorie as value from categorie',function(err,result){
    if(err){
      console.log(err);
    }else{
      res.send(result)
    }
  })
})

// add Product 
App.post('/addProduct',function(req,res){
    const Designateur = req.body.Designateur
    const prix = req.body.prix
    const quntite_product = req.body.quntite_product
    const date = req.body.date
    const idcategorie = req.body.idcategorie
    const state = req.body.state
  
  con.query('insert into product(Designateur,prix,quntite_product,date,idcategorie,state) values(?,?,?,?,?,?)',[Designateur,prix,quntite_product,date,idcategorie,state],(err,data)=>{
    if(err) return res.json(err);
    return res.json('Votre Produit est')
  })
})

// delete product
App.delete('/deleteProduct/:id',function(req,res){
  const id = req.params.id
  con.query('delete from product where idPro = ?',id,(err,data)=>{
    if(err) return res.json(err);
    return res.json('Produit est suppreme')
  })
})

// update product 
App.put('/updateProduct',function(req,res){
  const id = req.body.id 

  const Designateur = req.body.Designateur
    const prix = req.body.prix
    const quntite_product = req.body.quntite_product
    const date = req.body.date
    const idcategorie = req.body.idcategorie
    const state = req.body.state


    con.query('update product set Designateur=?,prix=?,quntite_product=?,date=?,idcategorie=?,state=? where idPro = ?',[Designateur,prix,quntite_product,date,idcategorie,state ,id],(err,data)=>{
      if(err) return res.json(err)
      return res.json('la mise a jour ete bien')
    })
})

// Gestion de Movements 
App.get('/Movement',function(req,res){
  con.query(`select Designateur , quntite, type
  , DATE_FORMAT(data_move, '%Y-%m-%d') as data_move from product inner join movement on product.idPro = movement.idPro `,function(err,result){
    if(err){
      console.log(err);
    }else{
      res.send(result)
    }
  })
})

// add Movements 
App.post('/add_Movement',function(req,res){

  const type = req.body.type
  const quntite = req.body.quntite
  const id = req.body.idPro
  const Date = req.body.data_move
  con.query('insert into movement(type,idPro,quntite,data_move) values(?,?,?,?)',[type,id,quntite,Date],function(err,result){
    if(err){
      console.log(err);
    }else{
      res.send(result)
    }
  })
})
//update Movement
App.put('/movement_update',function(req,res){
  const id = req.body.id

  const type = req.body.type
  const idPro = req.body.idPro
  const quntite = req.body.quntite
  const data_move = req.body.data_move

  con.query('update movement set type=? , idPro=? , quntite=? ,data_move=? where idMov = ?',[type,idPro,quntite,data_move,id]
  ,(err,data)=>{
      if(err) return res.json(err)
      return res.json('la mise a jour ete bien')
    }
  )

})

//delete Movement
App.delete('/deleteMovement/:id',function(req,res){
  const id = req.params.id
  con.query('delete  from movement where idMov = ?',id,function(err,result){
    if(err){
      console.log(err);
    }else{
      console.log('Yes')
    }
  })
})



// get fornisseur
App.get('/fornisseur',function(req,res){
  con.query(`select idSupplier, SupplierName as name , SupplierEmail as email ,SupplierCountry as country ,DATE_FORMAT(date, '%Y/%m/%d') as date from supplier ;
  `,function(err,result){
    if(err){
      console.log(err);
    }else{
      res.send(result)
    }
  })
})

// Ajoute Fournisseur
App.post('/fornisseur_Ajoute',function(req,res){
  const Nom = req.body.name
  const Email = req.body.email
  const Country = req.body.country
  const date = req.body.date
  
con.query('insert into supplier (SupplierName,SupplierEmail,supplierCountry,date) values(?,?,?,?)',[Nom,Email,Country,date],function(err,result){
  if(err){
    console.log(err)
  }else{
    res.send(result)
  }
})

})  

App.delete('/fornisseur_delete/:id',function(req,res){

  const id = req.params.id

  con.query('delete from supplier where idSupplier = ?',id,function(err,data){
    if(err){
      console.log(err);
    }else{
      console.log('Yes');
    }
  })

})

// fornisseur_update
App.put('/fornisseur_update',function(req,res){

  const id = req.body.id
  const name = req.body.name
  const email = req.body.email
  const country = req.body.country
  const date = req.body.date

  con.query("update supplier set SupplierName = ? , SupplierEmail=?,SupplierCountry=?,date=? where idSupplier = ? ", [name,email,country,date,id],function(err,result){
    if(err){
      console.log(err)
    }else{
      console.log('Yes')
    }
  }
  
)
})
// get all_Catgories
App.get('/all_Catgories',function(req,res){
  con.query(`select idcategorie, categoriesName, DATE_FORMAT(Date, '%Y-%m-%d') as Date from categorie`,function(err,result){
    if(err){
      console.log(err);
    }else{
      res.send(result)
    }
  })
})

App.post('/create_categorie',function(req,res){
  const Nom = req.body.categoriesName
  const date = req.body.Date

  con.query('insert into categorie(categoriesName,Date)values(?,?)',[Nom,date],function(err,data){
    if(err){
      console.log(err);
    }else{
      console.log('Yes');
    }
  })
})

App.delete('/suppreme_categorie/:id',function(req,res){
  const id = req.params.id
  con.query('delete from categorie where idcategorie = ?',id,function(err,data){
    if(err){
      console.log(err)
    }else{
      console.log('Yes')
    }
  })
})

App.put('/update_categories',function(req,res){
  const id = req.body.idcategorie
  const categoriesName = req.body.categoriesName
  const Date = req.body.Date

  con.query('update categorie set categoriesName = ? , Date=? where idcategorie = ?',[categoriesName,Date,id],function(err,data){
    if(err){
      console.log(err)
    }else{
      console.log("Yes")
    }
  })
})


// user login
App.post('/login_user',function(req,res){
  const username = req.body.username
  const login = req.body.login
  const password = req.body.password
  con.query('select * from adminpanel where Fistname = ? and login=? and password =?',[username,login,password],function(err,data){
    if(err){
      res.send({err:err})
    }if(data.length>0){
      res.send(data)
    }else{
      res.send("Your login is filed")
    }
  })
})

// get categorie
// App.get('/categorie',function(req,res){
//   con.query('select ')
// })



// quntite movement by type

App.get('/type',function(req,res){
  con.query(
    'select quntite , type from movement group by type',function(err,result){
      if(err){
        console.log(err);
      }else{
        res.send(result)
      }
    }
  )
})

App.get('/total_cat',function(req,res){
  con.query(
    'select count(*) as total from categorie',function(err,result){
      if(err){
        console.log(err);
      }else{
        res.send(result)
      }
    }
  )
})

App.listen(3001,()=>console.log('App is ready'))

