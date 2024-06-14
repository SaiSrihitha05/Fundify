import React from 'react'
import RootLayout from './Components/RootLayout'
import Home from './Components/Home'
import Signin from './Components/Signin'
import SignUp from './Components/SignUp'
import About from './Components/About'
import UserProfile from './Components/user-profile/UserProfile'
import Project from './Components/project/Project'
import Projects from './Components/projects/Projects'
import ProjectsByUser from './Components/projects-by-user/ProjectsByUser'
import AddProject from './Components/add-project/AddProject'
import RazorpayComponent from './Components/Razorpay'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import Form from './Form'
import { Route } from 'react-router-dom'
import Donate from './Components/DonatePopup'
function App() {
  let router=createBrowserRouter([
    {
        path:'',
        element:<RootLayout/>,
        children:[
        {
          path:'',
          element:<Home/>
        },
        {
          path:'Signin',
          element:<Signin/>
        },
        {
          path:'SignUp',
          element:<SignUp/>
        },
        {
          path:"user-profile",
          element:<UserProfile/>,
          children:[
            {
              path:"projects",
              element:<Projects />,
            },
            {
              path:"project/:projectId",
              element:<Project />
            },
            {
              path:'',
              element:<Navigate to='projects' />
            },
            {
              path:'AddProject',
              element:<AddProject />
            },
            {
              path:'projects/:username',
              element:<ProjectsByUser/>
            },
            {
              path:'project/:projectId/donate',
              element:<Donate/>
            }
          ]
        },
        {
          path:"razorpay-component",
          element:<RazorpayComponent/>
        }
  ]}
])
  return (
    
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
