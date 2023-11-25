import './App.css';
import About from './components/about/About';
import Footer from './components/footer';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Signup from './components/signup/Signup';
import Signin from './components/signin/Signin';
import Todo from './components/todo/Todo';
import { useEffect } from 'react';
import {useDispatch} from "react-redux";
import { authActions } from './store';
function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    const id = sessionStorage.getItem("id");
    if(id){
      dispatch(authActions.login());
    }
  },[])
  const apiurl = 'https://todobknd.onrender.com'||'http://localhost:5000';
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/todo' element={<Todo apiurl={apiurl}/>}></Route>
          <Route path='/signup' element={<Signup apiurl={apiurl}/>}></Route>
          <Route path='/signin' element={<Signin apiurl={apiurl}/>}></Route>
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
