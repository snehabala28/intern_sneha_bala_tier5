const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/noteBook').catch(error => handleError(error));
const notesModel = mongoose.model('notes',{name:String,description:String});
app.post('/add-data',(request,response)=>{
    let name = request.body.name;
    let description = request.body.description;
    let newBook = new notesModel({name:name,description:description});
    newBook.save((err)=>{
        if(err){
            response.send('Somthing Went Wrong!');
        }else{
            response.send('Note has been added!');
        }
    })
});
app.get('/get-data',(request,response)=>{

    notesModel.find({},(err,docs)=>{
        if(err){
            response.send('Somthing Went Wrong!');
        }else{
            response.send({status:true,message:'Data available!',data:docs});
        }
    })
});
app.get('/get-single-data/:id',(request,response)=>{
    let id = request.params.id;
    notesModel.findOne({_id:id},(err,docs)=>{
        if(err){
            response.send('Somthing Went Wrong!');
        }else{
            response.send({status:true,data:docs});
        }
    })
});
app.delete('/delete-data/:id',(request,response)=>{
    let id = request.params.id;
    notesModel.deleteOne({_id:id},(err)=>{
        if(err){
            response.send('Somthing Went Wrong!');
        }else{
            response.send('Data has been deleted');
        }
    })
});
app.put('/update-data-put/:id',(request,response)=>{
    let id = request.params.id;
    let name = request.body.name;
    let description = request.body.description;
    notesModel.updateOne({_id:id},{name:name,description:description},(err)=>{
        if(err){
            response.send('Somthing Went Wrong!');
        }else{
            response.send('Data successfully updated!');
        }
    })
});
app.patch('/update-data-patch/:id',(request,response)=>{
    let id = request.params.id;
    let name = request.body.name;
    let description = request.body.description;
    notesModel.updateOne({_id:id},{name:name,description:description},(err)=>{
        if(err){
            response.send('Somthing Went Wrong!');
        }else{
            response.send('Data successfully updated!');
        }
    })
});
app.listen(3000,()=>{
    console.log('Connection successfull!');
});