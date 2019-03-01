const mongoose= require('mongoose');
const express=require('express');
const router=express.Router();
var bodyParser=require('body-parser');

const config=require('../config/config');
const schema= require('../models/account');

const mongoURL = `mongodb://${config.db.host}/${config.db.name}?${config.db.auth}`;
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
router.use(bodyParser.urlencoded({ extended: false }))

router.post('/insertMany',(req,res)=>{
    const Accounts=[
        {account_no: 1,
            owner_name:'Gehad Ismail',
            created_on: new Date("2014/11/20 04:11")},
        {account_no: 2,
            owner_name:'Gehad2 Ismail',
            created_on: new Date("2014/11/20 04:11")},
        {account_no:3,
            owner_name:'Gehad3 Ismail',
            created_on:new Date("2014/11/20 04:11")}    
    ];
    
    mongoose.connect(mongoURL,{ useNewUrlParser: true }).then(()=>{
        console.log('Mongo is now connected');
        schema.insertMany(Accounts).then(()=>
        {
            console.log('multiple documents are inserted');
            return res.redirect('/Accounts/')
        }).catch((error)=>{
            mongoose.disconnect();
            return res.send(error);
        })
    }).catch((error)=>{
        mongoose.disconnect();
        return res.send(error);
    })
})

router.get('/',(req,res)=>{
    mongoose.connect(mongoURL)
    .then(() => {
        schema.find({})
      .then((accounts) => {
        console.log(`There are ${accounts.length} accounts`);
       // res.setHeader('Content-Type', 'text/plain');
        var data='';
        accounts.forEach((anAccount) => {
            data+=`<p>account_no:${anAccount.account_no} 
            owner_name:${anAccount.owner_name} 
            created_on:${anAccount.created_on} </p></br> `;
        });
        return res.send(data);
      })
      .catch((error) => {
        mongoose.disconnect();
        return res.send(`Error encountered retrieving all accounts. Error: ${error}`);
      });
    })
    .catch((error) => {
        return res.send(`Error encountered establishing connection. Error: ${error}`);
    });
  });

  router.get('/find/:id',(req,res)=>{
    mongoose.connect(mongoURL)
    .then(() => {
        const query = schema.find({})
      .where('account_no').equals(req.params.id)
        query.exec()
      .then((account) => {
        console.log(`There is a match`);
        return res.send([account[0].account_no,account[0].owner_name,account[0].created_on]);
      })
      .catch((error) => {
        mongoose.disconnect();
        return res.send(`Error encountered retrieving the specified document. Error: ${error}`);
      });
    })
    .catch((error) => {
        return res.send(`Error encountered establishing connection. Error: ${error}`);
    });
  });


  router.delete('/del/:id',(req,res)=>{
    mongoose.connect(mongoURL)
    .then(() => {
        const query = schema.deleteOne({'account_no':req.params.id})
     query.exec()
      .then(() => {
        console.log(`Successfully Deleted`);
        return res.redirect('/Accounts/')
      })
      .catch((error) => {
        mongoose.disconnect();
        return res.send(`Error encountered deleting the specified document. Error: ${error}`);
      });
    })
    .catch((error) => {
        mongoose.disconnect();
        return res.send(`Error encountered establishing connection. Error: ${error}`);
    });
  });

  
  router.put('/upd/:id',(req,res)=>{
    mongoose.connect(mongoURL)
    .then(() => {
      console.log(req.body);
        const query = schema.findOneAndUpdate({'account_no':req.params.id},req.body)
     query.exec()
      .then(() => {
        console.log(`Successfully updated`);
        return res.redirect('/Accounts/')
      })
      .catch((error) => {
        mongoose.disconnect();
        return res.send(`Error encountered updating the specified document. Error: ${error}`);
      });
    })
    .catch((error) => {
        mongoose.disconnect();
        return res.send(`Error encountered establishing connection. Error: ${error}`);
    });
  });

module.exports=router;