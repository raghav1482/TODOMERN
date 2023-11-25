import React , {useState} from 'react'
import "../signup/signup.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import { authActions } from '../../store';

export default function Signin({apiurl}){
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const [Inputs , setInputs] = useState({email:"" , password:""});
    const change =(e)=>{
        const {name , value} = e.target;
        setInputs({...Inputs,[name]:value});
    };
    const submit =async(e)=>{
        e.preventDefault();
        await axios.post(`${apiurl}/api/v1/login`,Inputs).then((response)=>{
            const id = response.data.id;
            if(id){
                console.log(response.data.message);
                sessionStorage.setItem("id",id);
                dispatch(authActions.login());
                navigate("/todo");
            }
            else{
                alert(response.data.message);
            }
    });
    };
    return(<>
    <div className='signdiv'>
        <div className="container">
            <div className="row">
                <div className="col-sm-6 col-md-4 col-md-offset-4">
                    <div className="account-wall">
                        <img className="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                            alt=""/>
                        <form className="form-signin">
                        <input type="email" className="form-control" placeholder="Email" aria-describedby="emailHelp" name='email'  onChange={change} value={Inputs.email}/>
                        <input type="password" className="form-control" placeholder="Password" name='password'  onChange={change} value={Inputs.password}/>
                        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={submit}>
                            Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>)
}