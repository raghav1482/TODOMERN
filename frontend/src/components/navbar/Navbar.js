import React from 'react';
import user from "../images/user.png";
import {Link, useNavigate} from "react-router-dom";
import "../navbar/nav.css";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store';
export default function Navbar(){
  const islogIn = useSelector((state)=>state.isloggin);
  const dispatch = useDispatch();
  console.log(islogIn);
  const logout = ()=>{
    sessionStorage.clear("id");
    dispatch(authActions.logout());
  }
    return(<>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand mb-0 h1" to="/">MyTODO</Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarText">
    <ul className="navbar-nav ms-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Home </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/about">About Us</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/todo">Todo</Link>
      </li>
      {!islogIn && <>
        <li className="nav-item">
        <Link className="nav-link" to="/signup">SignUp</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/signin">SignIn</Link>
      </li>
      </>}
      {islogIn && 
      <li className="nav-item">
        <Link className="nav-link" to="/signin" onClick={logout}>LogOut</Link>
      </li>
      }
      <li className="nav-item">
        <Link className="nav-link" to="/"><img id="usericon" src={user}></img></Link>
      </li>
    </ul>
  </div>
</nav>
    </>);
}