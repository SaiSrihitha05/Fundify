import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProjectsByUser() {
  const [projectsList, setProjectsList] = useState([]);
  let navigate = useNavigate();
  let { currentUser } = useSelector(
    (state) => state.userLoginReducer
  );

  const getProjectsOfCurrentUser = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/user-api/projects/${currentUser.username}`);
      console.log(currentUser.username)
      console.log(response.data.payload)
      setProjectsList(response.data.payload);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const readProjectByProjectId = (projectObj) => {
    navigate(`../project/${projectObj.projectId}`, { state: projectObj });
  };

  useEffect(() => {
    getProjectsOfCurrentUser();
  }, []); // Fetch projects whenever currentUser changes

  return (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
        {projectsList&&projectsList.map((project) => (
          <div className="col" key={project.projectId}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{project.title}</h5>
                <p className="card-text">
                  {project.content.substring(0, 80) + "...."}
                </p>
                <button className="custom-btn btn-4" onClick={() => readProjectByProjectId(project)}>
                  <span>Read More</span>
                </button>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">
                  Added on {project.dateOfCreation}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsByUser;
