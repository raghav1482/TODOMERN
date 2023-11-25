import React from 'react';
import "./todo.css";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
export default function TodoCard(props){
    return(<>
    <div className='todocard'>
    <div className='p-3'>
        <h5>{props.title}</h5>
        <p className='body'>{props.body}</p>
    </div>
    <div className='d-flex justify-content-around delupdate my-2'>
        <div onClick={()=>{props.display("block");props.toBeUpdate(props.updateId);}}>
            <EditNoteIcon className='tsk-icon'/>
        </div>
        <div onClick={()=>{props.delid(props.id)}}>
            <DeleteIcon className='tsk-icon'/>
        </div>
    </div>
    </div>
    </>);
}