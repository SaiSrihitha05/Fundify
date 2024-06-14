import React, { useState, useEffect } from 'react';
import { axiosWithToken } from '../../axiosWithToken';
import { useNavigate } from 'react-router-dom';

function Projects() {
  const [projectsList, setProjectsList] = useState([]);
  const [filteredProjectsList, setFilteredProjectsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const getProjects = async () => {
    try {
      const res = await axiosWithToken.get('http://localhost:4000/user-api/projects');
      if (res.data && res.data.payload && Array.isArray(res.data.payload)) {
        setProjectsList(res.data.payload);
        setFilteredProjectsList(res.data.payload); // Initialize filtered list with all projects
      } else {
        console.error('Invalid data format received from the server');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const readProjectByProjectId = (projectObj) => {
    navigate(`../project/${projectObj.projectId}`, { state: projectObj });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProjectsList(projectsList); // Show all projects when 'All' is selected
    } else {
      const filteredProjects = projectsList.filter(project => project.category === category);
      setFilteredProjectsList(filteredProjects);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  // Define filter options
  const filterOptions = ['All', 'Health', 'Education', 'Disaster', 'Others'];

  return (
    <div className='container'>
      <div className="filters">
        <label htmlFor="category">Filter by Category: </label>
        {filterOptions.map((option) => (
          <button
            key={option}
            className={selectedCategory === option ? 'active-btn' : 'custom-btn'}
            onClick={() => handleCategoryChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
        {filteredProjectsList && filteredProjectsList.map((project) => (
          <div className="col" key={project.projectId}>
            <div className="card h-100">
              <img src={project.imageurl} className="card-img-top" alt="Project Image" />
              <div className="card-body">
                <h5 className="card-title">{project.title}</h5>
                <p className="card-text">{project.content && project.content.substring(0, 80) + '....'}</p>
                <button className="custom-btn btn-4" onClick={() => readProjectByProjectId(project)}>
                  <span>Read More</span>
                </button>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">Added on {project.dateOfCreation}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br />
    </div>
  );
}

export default Projects;