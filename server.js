const express = require('express');
const fileUpload = require('express-fileupload')
const {v4:uuidv4}=require('uuid');
const cors =require('cors');
const path=require('path');

//create web server
const app =express();

app.use(cors());
app.use(fileUpload());

app.post('/upload',(req,res)=>{
    // check if files was upload
    if(!req.files || !req.files.file){
        return res.status(400).json({
            error:'No file uploaded'
        })
    }
    const file=req.files.file;
    const maxSize=10*1024*1024;
    if(file.size>maxSize){
        return res.status(400).json({
            error:'File size is too big'
        })

    }
    // generate unique filename
    const filename =uuidv4()+path.extname(file.name);
    const upload_dir = `${__dirname}/client/public/uploads`;
    console.log('Upload directory:', upload_dir);
    console.log('File to be saved:', `${upload_dir}/${filename}`);
    //save file to uploads folder
    file.mv(`${upload_dir}/${filename}`,(err)=>{
        if(err){
            return res.status(500).send(err)
            
        }
        res.json({
            fileName:filename,
            filePath:`/uploads/${filename}`
        })
    })

});

app.listen(80,()=>console.log('server is running on http://localhost:80 '));