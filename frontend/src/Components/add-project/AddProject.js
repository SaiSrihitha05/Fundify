import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CurrencyInput from 'react-currency-input-field';

function AddProject() {
  const { register, handleSubmit, setValue } = useForm();
  const { currentUser } = useSelector((state) => state.userLoginReducer);
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [photoFile, setPhotoFile] = useState(null);
  const [proofFile, setProofFile] = useState(null);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [proofUploaded, setProofUploaded] = useState(false);

  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` }
  });

  const postNewProject = async (project) => {
    project.dateOfCreation = new Date();
    project.dateOfModification = new Date();
    project.projectId = Date.now();
    project.username = currentUser.username;
    project.comments = [];
    project.status = true;
    console.log(project);
    try {
      const res = await axiosWithToken.post('http://localhost:4000/user-api/project', project);
      console.log('res', res);
      if (res.data.message === "Project Added") {
        {<p>Project Added</p>}
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      console.error('Error posting project:', error);
      setErr('Error posting project');
    }
  };

  const handleTimeLimitChange = (date) => {
    setValue('timeLimit', date); // Set value for the 'timeLimit' field
  };

  return (
    <div className="container">
      <h2 className="p-3">Add Campaign</h2>
      {err.length !== 0 && <p className="text-danger fs-5">{err}</p>}
      <form onSubmit={handleSubmit(postNewProject)}>
        <div className="mb-4">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            {...register("title")}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="form-label">
            Select a category
          </label>
          <select
            {...register("category")}
            id="category"
            className="form-select"
          >
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Disaster">Disaster</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            {...register("content")}
            className="form-control"
            id="content"
            rows="10"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="GainerName" className="form-label">
          GainerName
          </label>
          <input
            type="text"
            className="form-control"
            id="GainerName"
            {...register("GainerName")}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="Photos" className="form-label">
          Select Images
          </label>
          <input
            type="text"
            className="form-control"
            id="Photos"
            {...register("imageurl")}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="Proof" className="form-label">
          Proof
          </label>
          <input
            type="file"
            className="form-control"
            id="Proof"
            {...register("Proof")}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="OrgName" className="form-label">
              Select an Organization Name
            </label>
            <select
              {...register("OrgName")}
              id="OrgName"
              className="form-select"
            >
              <option value="MIT Media Lab">MIT Media Lab</option>
              <option value="Indian Institutes of Technology (IITs)">Indian Institutes of Technology (IITs)</option>
              <option value="Indian Institute of Management Ahmedabad (IIMA)">Indian Institute of Management Ahmedabad (IIMA)</option>
              <option value="National Institutes of Technology (NITs)">National Institutes of Technology (NITs)</option>
              <option value="Indian Institute of Science (IISc)">Indian Institute of Science (IISc)</option>
              <option value="Red Cross">Red Cross</option>
              <option value="Oxfam">Oxfam</option>
              <option value="Save the Children">Save the Children</option>
              <option value="World Vision">World Vision</option>
              <option value="ShelterBox">ShelterBox</option>
              <option value="Mayo Clinic">Mayo Clinic</option>
              <option value='Johns Hopkins Medicine'>Johns Hopkins Medicine</option>
              <option value='Dana-Farber Cancer Institute'>Dana-Farber Cancer Institute</option>
              <option value='St. Jude Childrens Research Hospital'></option>
              </select>
          </div>

          <div className="mb-4">
            <label htmlFor="ContactNo" className="form-label">
              Contact No
            </label>
            <input
              type="text"
              className="form-control"
              id="ContactNo"
              {...register("ContactNo")}
            />
          </div>

          <div className="mb-4">
          <label htmlFor="timeLimit" className="form-label">
              Time Limit
            </label>
          <input
            type="date"
            className="form-control"
            id="timelimit"
            {...register("timelimit")}
          />
            
            
          </div>

          <div className="mb-4">
            <label htmlFor="fundRequired" className="form-label">
              Fund Required
            </label>
            <CurrencyInput
              id="fundRequired"
              name="fundRequired"
              className="form-control"
              decimalsLimit={2}
              prefix="$"
              onValueChange={(value) => setValue('fundRequired', value, { shouldValidate: true })} // Update value using setValue
            />
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-dark">
              Post
            </button>
          </div>
        </form>
      </div>
    );
  }

export default AddProject;
