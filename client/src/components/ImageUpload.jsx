import React, { Fragment, useState,useEffect } from 'react'
import Message from './Message';
import Progress from './Progress';
import axios from '../requests/axios';
import {isEmpty} from 'lodash'

const ImageUpload = () => {
    const [message, setMessage]=useState('hello world');
    const [uploadPercentage,setUploadPercentage]= useState(0);
    const [file, setFile]=useState('');
    const [upLoadFile,setUploadFile]=useState({})
    useEffect(() => {
        console.log(upLoadFile);
    }, [upLoadFile]);
    const onChange =(e)=>{
        console.log('e',e.target.files);
        if(e.target.files.length){
            setFile(e.target.files[0]);
        }
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',file);
        try {
            const res = await axios.post('/upload',formData,{
                onUploadProgress:(ProgressEvent)=>{
                    setUploadPercentage(
                        parseInt(
                            Math.round((ProgressEvent.loaded *100/ProgressEvent.total))
                        )
                    )
                }
            });
            const {fileName, filePath} = res.data;
            console.log(fileName);
            console.log(filePath);
            
            setMessage('file uploaded'); // 移动到这里
            //clear progress
            setTimeout(()=>{
            setUploadPercentage(0)
            setUploadFile({fileName, filePath})}
            ,5000);
        } catch(error) {
            console.error();
            setMessage('An unexpected error occured');
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
        {!isEmpty(upLoadFile) && (
            <div className='row mt-5'>
                <div className='col-md-6 m-auto'>
                    <h3 className='text-center'>
                        {upLoadFile.fileName}
                    </h3>
                    {console.log(upLoadFile.filePath)}
                    <img src={upLoadFile.filePath} style={{width:'100%'}} alt=''/>
                </div>
            </div>
        )}
    </Fragment>
  )
}

export default ImageUpload
