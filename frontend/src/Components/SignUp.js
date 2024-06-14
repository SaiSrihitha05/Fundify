import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios'


function Signup() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [err, setErr] = useState("");
  let [state, setState] = useState(false);
  let [signupSuccess, setSignupSuccess] = useState(false);


  async function onSignUpFormSubmit(userObj){
    // Add your form submission logic here
    let res = await axios.post('http://localhost:4000/user-api/user', userObj)
    console.log(res);
    if (res.status === 201) {
      setState(true);
      setSignupSuccess(true);
      setErr("");
    } else {
      setErr(res.data.message);
      console.log(res.data.message)
    }
  
 };

  return (
    <div className="text-center">
      <h1 className="display-6 text-black pt-5">Sign Up</h1>
      <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
        <div className="form">
        {err.length!==0&&<p className = "text-danger fs-3">{err}</p>}
          <input
            style={{ width: '300px' }}
            type="text"
            {...register("username", { required: true, minLength: 4 })}
            className={`form-control mx-auto mt-5 p-2 ${errors.username ? 'is-invalid' : ''}`}
            placeholder="Username"
          />
          {errors.username?.type === "required" && (
            <p className="text-danger">username is required</p>
          )}
          {errors.username?.type === "minLength" && (
            <p className="text-danger">Min Length should be 4</p>
          )}
          <input
            style={{ width: '300px' }}
            type="password"
            {...register("password", { required: true, minLength: 4 })}
            className={`form-control mx-auto mt-4 p-2 ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-danger">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-danger">Password should be at least 8 characters long</p>
          )}

          <input
            style={{ width: '300px' }}
            type="text"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            className={`form-control mx-auto mt-4 p-2 ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-danger">Email is required</p>
          )}
          {errors.email?.type === "pattern" && (
            <p className="text-danger">Invalid email format</p>
          )}
        </div>

        <button className="btn btn-success mt-4" type="submit" >
          Sign Up

        </button>

        <h5 className="p-4">
          Already have an account?{" "}
          <Link to="/SignIn">Sign In</Link> here
        </h5>
      </form>
    </div>
  );
}

export default Signup;
