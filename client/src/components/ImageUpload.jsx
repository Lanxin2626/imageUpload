import React, { Fragment, useState } from 'react'
import Message from './Message';
import Progress from './Progress';
import axios from '../requests/axios';

const ImageUpload = () => {
    const [message, setMessage]=useState('hello world');
    const [uploadPercentage,setUploadPercentage]= useState(0);
    const [file, setFile]=useState('');
    const [upLoadFile,setUploadFile]=useState({})
    const onChange =(e)=>{
        console.log('e',e.target.files);
        if(e.target.files.length){
            setFile(e.target.files[0]);
        }
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const formData =new FormData();
        formData.append('file',file);
        try{
            const res =await axios.post('/upload',formData,{
                onUploadProgress:(ProgressEvent)=>{
                    setUploadPercentage(
                        parseInt(
                            Math.round((ProgressEvent.loaded *100/ProgressEvent.total))
                        )
                    )
                }
            })
            //clear progress
            setTimeout(setUploadPercentage(0),5000);
            setMessage('file uploaded');
        }
        catch(error){
            console.error();
        }
    }
    return (
    <Fragment>
        <form onSubmit={handleSubmit}>
            {message && <Message message={message} setMessage={setMessage}/>}
            <div className='input-group mb-3'>
                <input type='file' className='form-control' onChange={onChange} />
            </div>
            <Progress precentage={uploadPercentage}></Progress>
            <input type="submit" value="Upload"
                className='btn btn-primary btn-block mt-4' />
        </form>
    </Fragment>
  )
}

export default ImageUpload
