import React from 'react';
import { useForm } from 'react-hook-form';

const Form = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Title:</label>
        <input type="text" name="title" ref={register({ required: true })} />
        {errors.title && <span>Title is required</span>}
      </div>
      <div>
        <label>Category:</label>
        <select name="category" ref={register({ required: true })}>
          <option value="">Select Category</option>
          <option value="education">Education</option>
          <option value="medical">Medical</option>
          <option value="disaster">Disaster</option>
          <option value="others">Others</option>
        </select>
        {errors.category && <span>Category is required</span>}
      </div>
      <div>
        <label>Gainer Name:</label>
        <input type="text" name="gainerName" ref={register({ required: true })} />
        {errors.gainerName && <span>Gainer Name is required</span>}
      </div>
      <div>
        <label>Content (StoryLine):</label>
        <textarea name="content" ref={register({ required: true })}></textarea>
        {errors.content && <span>Content is required</span>}
      </div>
      <div>
        <label>Add Images/Video:</label>
        <input type="file" name="images" ref={register} />
      </div>
      <div>
        <label>Details of Gainer:</label>
        <input type="text" name="details" ref={register({ required: true })} />
        {errors.details && <span>Details of Gainer is required</span>}
      </div>
      <div>
        <label>All Organization Names:</label>
        <select name="organization" ref={register({ required: true })}>
          <option value="">Select Organization</option>
          <option value="org1">Organization 1</option>
          <option value="org2">Organization 2</option>
          <option value="org3">Organization 3</option>
          <option value="org4">Organization 4</option>
          <option value="org5">Organization 5</option>
          <option value="org6">Organization 6</option>
          <option value="org7">Organization 7</option>
        </select>
        {errors.organization && <span>Organization is required</span>}
      </div>
      <div>
        <label>Contact No:</label>
        <input type="text" name="contact" ref={register({ required: true })} />
        {errors.contact && <span>Contact No is required</span>}
      </div>
      <button type="submit">Post Project</button>
    </form>
  );
};

export default Form;
