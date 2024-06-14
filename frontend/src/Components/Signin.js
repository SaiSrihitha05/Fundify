import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux'
import { userLoginThunk } from '../redux/slices/userSlice';

function Signin() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  let {isPending,currentUser,loginUserStatus,errorOccured,errMsg} = useSelector(state=>state.userLoginReducer)
  let dispatch = useDispatch();
  let navigate = useNavigate()

  function onSignInFormSubmit(userObj){
    // Add your form submission logic here
    console.log(userObj);
    dispatch(userLoginThunk(userObj))

  };

  useEffect(() => {
    console.log(loginUserStatus)
    console.log(currentUser)
    if (loginUserStatus) {
        navigate("/user-profile");
    }
  }, [loginUserStatus,currentUser]);

  return (
    <div className="text-center">
      <h1 className="display-6 text-black pt-5">Sign In</h1>
      <div className="form">
        
        <div>
          <input
            placeholder='Enter Your User Name'
            style={{ width:'300px'}}
            type="text"
            {...register("username", { required: true, minLength: 4 })}
            className={`form-control mx-auto mb-4 mt-5 ${errors.username ? 'is-invalid' : ''}`}
          />
          {errors.username?.type === "required" && (
            <p className="text-danger">User Name is required</p>
          )}
          {errors.username?.type === "minLength" && (
            <p className="text-danger">Min Length should be 4</p>
          )}
        </div>

        <div>
          <input
          placeholder='Enter Password'
            style={{ width: '300px' }}
            type="password"
            {...register('password', { required: true, minLength: 4 })}
            className={`form-control mx-auto mb-4 ${errors.password ? 'is-invalid' : ''}`}
          />
          {errors.password?.type === 'required' && (
            <p className="text-danger">Password is required</p>
          )}
          {errors.password?.type === 'minLength' && (
            <p className="text-danger">Password should be at least 4 characters long</p>
          )}
        </div>

        <button
          className="btn btn-success mt-3"
          onClick={handleSubmit(onSignInFormSubmit)}
        >
          Sign In
        </button>

        <h5 className='p-3'>
          New User?{" "}
          <Link to='/SignUp'>Sign Up</Link>{" "}
          here
        </h5>
      </div>
      
    </div>
  );
}

export default Signin;
