import { createBrowserRouter } from "react-router-dom"
import { RouterProvider } from "react-router-dom"
import Home from "./components/pages/Home"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Jobs from "./components/pages/Jobs"
import Browse from "./components/pages/Browse"
import Profile from "./components/pages/Profile"
import JobDescription from "./components/pages/JobDescription"
import Companies from "./components/pages/admin/Companies"
import CompanyCreate from "./components/pages/admin/CompanyCreate"
import CompanySetup from "./components/pages/admin/CompanySetup"
import AdminJobs from "./components/pages/admin/AdminJobs"
import PostJob from "./components/pages/admin/PostJob"
import Applicants from "./components/pages/admin/Applicants"
import ProtectedRoute from "./components/pages/admin/ProtectedRoute"



const appRouter = createBrowserRouter([

  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {

    path: '/profile',
    element: <Profile />

  },
  //For Admin

  {
    path: '/admin/companies',
    element: <ProtectedRoute> <Companies /></ProtectedRoute> 
  },
  {
    path: '/admin/companies/create',
    element: <ProtectedRoute> <CompanyCreate /></ProtectedRoute>  
  },
  {
    path: '/admin/companies/:id',
    element: <ProtectedRoute> <CompanySetup /></ProtectedRoute>  
  },
  {
    path:'/admin/jobs',
    element: <ProtectedRoute> <AdminJobs/></ProtectedRoute> 
  },
  {
    path:'/admin/jobs/create',
    element: <ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    path:'/admin/jobs/:id/applicants',
    element: <ProtectedRoute><Applicants/></ProtectedRoute> 
  }


]
)
function App() {


  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
