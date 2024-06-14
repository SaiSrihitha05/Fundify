import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import './UserProfile.css'
function UserProfile() {
  let { currentUser } = useSelector(
    (state) => state.userLoginReducer);
  return (
    <div>
    <NavLink to='AddProject' className='fs-4 text-black nav-link1 mt-4 mb-4' style={{textDecoration:"none",margin:"auto"}}>Create a Campaign</NavLink>
      <Outlet />
    </div>
  );
}

export default UserProfile;