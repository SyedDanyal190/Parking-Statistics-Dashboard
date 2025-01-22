import React from "react"
import { Navigate } from "react-router-dom";


// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"


// Dashboard
import Dashboard from "../pages/Dashboard/index";
import Add from "../pages/Dashboard/Add";


const userRoutes = [
  { path: "/dashboard", component: <Dashboard /> },

  // // add-TollPlaza
  { path: "/add-Parking", component: <Add /> },

 

  // //profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },

]

const authRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },

]

export { userRoutes, authRoutes }
