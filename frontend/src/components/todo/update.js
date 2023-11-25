import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function Update({display ,update,apiurl}) {
    useEffect(()=>{
        setInputs({title:update.title , body:update.body})
    },[update])
    const [Inputs , setInputs] = useState({title:"" , body:""});
    const change =(e)=>{
        const {name , value} = e.target;
        setInputs({...Inputs,[name]:value})
    }
    const submit =async()=>{
        await axios.put(`${apiurl}/api/v2/updatetask/${update._id}`,Inputs).then((response)=>{
            toast.success(response.data.message);
        })
        display("none");
    }
  return (
    <div className='todo-update-container'>
      <input type='text' className='up-title' name='title' onChange={change} placeholder='Title' value={Inputs.title}/>
      <textarea className='up-body' name='body' onChange={change} placeholder='Todo' value={Inputs.body}/>  
      <div>
      <button type='submit' onClick={submit} className='add-btn updt-btn'>Update</button>
      <button onClick={()=>{display("none")}} className='add-btn close-btn'>Close</button>
      </div>
    </div>
  )
}

export default Update
