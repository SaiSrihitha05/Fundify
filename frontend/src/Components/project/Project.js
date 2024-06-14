// Project.js
import './Project.css'
import { useLocation } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import { axiosWithToken } from '../../axiosWithToken';
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { FcClock } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FcCalendar } from "react-icons/fc";
import { FcComments } from "react-icons/fc";
import { FcPortraitMode } from "react-icons/fc";
import { BiCommentAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { MdRestore } from "react-icons/md";
import DonatePopup from '../DonatePopup';

function Project() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showDonatePopup, setShowDonatePopup] = useState(false);
  const { currentUser } = useSelector(
    (state) => state.userLoginReducer
  );
  const handleDonateClick = () => {
    // Redirect to RazorpayComponent
    navigate('/razorpay-component');
  };

  const { register, handleSubmit } = useForm();
  const [comment, setComment] = useState('');
  const timeLimitDate = new Date(state.timelimit);
  const today = new Date();
  const differenceInMs = timeLimitDate.getTime() - today.getTime();
  const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

  const [projectEditStatus, setProjectEditStatus] = useState(false);

  
  console.log(state);

  // Add comment to a project by user
  const writeComment = async (commentObj) => {
    commentObj.username = currentUser.username;
    const res = await axiosWithToken.post(`http://localhost:4000/user-api/report/${state.projectId}`, commentObj);
    if (res.data.message === 'Report Added') {
      setComment(res.data.message);
    }
  };


 
  // Enable edit state
  const enableEditState = () => {
    setProjectEditStatus(true);
  };

  // Save modified project
  const saveModifiedProject = async (editedProject) => {
    const modifiedProject = { ...state, ...editedProject };
    // Change date of modification
    modifiedProject.dateOfModification = new Date();
    // Remove _id
    delete modifiedProject._id;
    // Make HTTP PUT request to save modified project in the database
    const res = await axiosWithToken.put('http://localhost:4000/user-api/project', modifiedProject);
    if (res.data.message === 'Project Modified') {
      setProjectEditStatus(false);
    }
  };

  // Convert ISO date to UTC date
  function ISOtoUTC(iso) {
    const date = new Date(iso).getUTCDate();
    const day = new Date(iso).getUTCDay();
    const year = new Date(iso).getUTCFullYear();
    return `${date}/${day}/${year}`;
  }

  return (
    <div className='container'>
      {projectEditStatus === false ? (
        <>
          <div className="d-flex justify-content-between">
            <div>
              <p className="display-6 me-4">{state.title}</p>
              <span className="py-3">
                <small className=" text-secondary me-4">
                  <FcCalendar className="fs-4" />
                  Created on: {(state.dateOfCreation)}
                </small>
              </span>
            </div> 
          </div>
          {state.imageurl && <img src={state.imageurl} style={{width:"250px",height:"250px",margin:"auto",display:"block"}} alt="Project Image" />}
    
          <p className="lead mt-3" style={{ whiteSpace: "pre-line" }}>
            {state.content}
          </p>

          {console.log(state)}
          <p>Gainer Name: {state.GainerName}</p>
          <p>No of Days Left: {differenceInDays}</p>
          <p>Funds raised:</p>
          <p>Fund required:{state.fundRequired}</p>
          <p>Time Limit:{state.timelimit}</p>

          <div>
            <div className="comments my-4">
              {state.comments.length === 0 ? (
                <p className="display-6">Add report</p>
              ) : (
                state.comments.map((commentObj, ind) => (
                  <div key={ind} className="bg-light p-3">
                    <p
                      className="fs-4"
                      style={{
                        color: "dodgerblue",
                        textTransform: "capitalize",
                      }}
                    >
                      <FcPortraitMode className="fs-2 me-2"/> {commentObj.username} 
</p>
<p
  style={{
    fontFamily: "fantasy",
    color: "lightseagreen",
  }}
  className="ps-4"
>
  <FcComments className="me-2" />
  {commentObj.comment}
</p>
</div>
))
)}
</div>

<form onSubmit={handleSubmit(writeComment)}>
<input
type="text"
{...register("comment")}
className="form-control mb-4"
placeholder="Share your issue here"
/>
<button type="submit" className="btn btn-success center" >
Report <BiCommentAdd className="fs-3" />
</button>
<br />
<br />
<button type="submit" className="btn btn-success center" onClick={handleDonateClick}>
Donate 
</button>
<br />
<br />
<button className='btn btn-success text-end'>Share</button>
<br />
<br />
</form>
</div>


</>
) : (
console.log("")
)}
</div>
);
}

export default Project;
