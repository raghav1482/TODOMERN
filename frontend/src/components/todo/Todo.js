import React, { useEffect, useState } from 'react';
import TodoCard from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Update from './update.js';
export default function Todo({apiurl}){
    const [loader , setLoad] = useState(false);
    const [Inputs , setInputs] = useState({title:"" , body:""});
    const [toUpdat , setToUpdate] = useState({title:"" , body:""});
    const [Array , setArray] = useState([]);
    let id = sessionStorage.getItem("id");
    const change=(e)=>{
        const {name , value} = e.target;
        setInputs({...Inputs , [name]:value});
    };
    const submit =async()=>{
        setLoad(true);
        try{

            if(id){
                await axios.post(`${apiurl}/api/v2/addtask`,{title:Inputs.title , body:Inputs.body , id:id}).then((response)=>{
                })
                setArray([...Array , Inputs]);
                setInputs({title:"" , body:""});
                toast.success("Your task is added");
                setLoad(false);
            }
            else{
                setArray([...Array , Inputs]);
                setInputs({title:"" , body:""});
                toast.success("Your task is added");
                toast.error("Login to save!!");
                setLoad(false);
            }
        }catch(e){
            alert("ERROR: "+ e);
            setLoad(false);
        }
    };
    const del=async(cardid)=>{
        setLoad(true);
        try{
            if(id){
                await axios.delete(`${apiurl}/api/v2/deletetask/${cardid}`,{data:{id:id}}).then((response)=>{
                    toast.success("Your task is deleted");
                    setLoad(false);
                });
            }
            else{
                toast.error("Plase Signin First");
                setLoad(false);
            }
        }catch(e){
            alert("ERROR: "+ e);
            setLoad(false);
        }
    }
    const dis=(value)=>{
        document.getElementById("todo-update").style.display = value;
    }

    const update = (value)=>{
        setToUpdate(Array[value]);
    }
    useEffect(()=>{
        try{
            if(id){            
                const fetch = async()=>{
                        await axios.get(`${apiurl}/api/v2/gettasks/${id}`).then((response)=>{
                            setArray(response.data.list);
                        });
                    }
                    fetch();
                }
            }catch(e){
                alert("ERROR: "+e);
            }
        },[submit]);
    return(<>
    <div className='todo'>
        <ToastContainer />
        <div className='todo-main continer d-flex justify-content-center align-items-center'>
            <h1>Let's add new task....:)</h1>
            <div className='d-flex flex-column w-25 inputTask'>
                <input type='text' placeholder='TITLE' name='title' onChange={change} value={Inputs.title} className='my-2'/>
                <textarea type='text' placeholder='BODY' name='body' onChange={change} value={Inputs.body}className='my-2'/>
                <button className='add-btn' onClick={submit}>{loader?<><div class="spinner-border text-light" role="status">
  <span class="visually-hidden">Loading...</span>
</div></>:"Add"}</button>
            </div>
        </div>
        <div className='todo-body'>
            <h3>Your Tasks</h3>
            <div className='container-fluid tsks'>
                { Array && Array.map((item , index)=>(<div className='d-inline-block col-ld-3 mx-3 my-2' key={index}><TodoCard title={item.title} body={item.body} id={item._id} delid={del} display={dis} updateId={index} toBeUpdate={update}/></div>))}
            </div>
        </div>
    </div>  
    <div className='todo-update' id='todo-update'>
    <Update display={dis} update={toUpdat} apiurl={apiurl}/>
    </div>  
</>);
}
