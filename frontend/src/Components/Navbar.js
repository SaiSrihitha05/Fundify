import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import Image from './logo2.png'
import { useSelector,useDispatch } from 'react-redux';

import { resetState } from '../redux/slices/userSlice';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  let {loginUserStatus,currentUser,errorOccured,errMsg} = useSelector((state)=>state.userLoginReducer)
  let dispatch = useDispatch()
 
  function signOut(){
    localStorage.removeItem('token')
    dispatch(resetState())
  }

 
  return (
    <nav className="navbar">
      
    <Link to="/" className="navbar-brand text-white">
      <img src={Image} alt="" style={{ width: '85px', height: '70px' }} className='d-inline' />
    </Link>
    {loginUserStatus === false ? (
  <>
    <ul className="navbar-nav flex-row">
    <li className="nav-item">
        <Link to="/" className="nav-link text-white">
          Home
        </Link>
      </li>
      
      <li className="nav-item">
        <Link to="/signin" className="nav-link text-white">
          Sign In
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/signup" className="nav-link text-white">
          Sign Up
        </Link>
      </li>
      </ul>
    </>
  ) : (
    <div>
    <span className="lead  fs-4 me-3 fw-1 d-block"  style={{ color: "#994570" ,fontSize:'1.1rem',fontFamily:'fantasy'}}>{currentUser.username}  
             </span>
            
            
    <NavLink
            className="nav-link"
            to="signin"
            style={{ color: "var(--light-grey)" }}
            onClick={signOut}
          >

             SignOut
          </NavLink>
          
          </div>
  )}

</nav>
  );
};

export default Navbar;