import Navbar from "@/components/shared/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import AdminJobsTable from "./AdminJobsTable"
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs.jsx"
import { setSearchJobBytext } from "@/redux/jobSlice"



const AdminJobs = () => {
   useGetAllAdminJobs()
   const [input, setInput] = useState("");
   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(()=>{
      dispatch(setSearchJobBytext(input))
   },[input])
   return (
      <>
         <Navbar />

         <div className="max-w-6xl mx-auto my-10">

            <section className="flex items-center justify-between my-5">
               <Input
                  className='w-fit'
                  placeholder='Filter by name, role'
                  value={input}
                  onChange = {(e)=>setInput(e.target.value)}
               />
               <Button onClick={()=>navigate('/admin/jobs/create')}>Post New Jobs</Button>
            </section>
            <AdminJobsTable />

         </div>
      </>
   )
}

export default AdminJobs;
