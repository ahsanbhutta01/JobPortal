import { useDispatch, useSelector } from "react-redux"
import Navbar from "../shared/Navbar"
import Job from "./Job"
import { useEffect } from "react";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";


const Browse = () => {
   const {allJobs} = useSelector(store => store.jobSlice);
   const dispatch = useDispatch();
   useGetAllJobs()

   useEffect(()=>{
      return ()=>{
         dispatch(setSearchedQuery(""));
      }
   },[dispatch])

   return (
      <>
         <Navbar />

         <div className="max-w-7xl mx-auto my-9">

            <h1 className="font-bold text-xl my-10">Search Results ({allJobs.length})</h1>

            <section className="grid grid-cols-3 gap-4 ">
               {
                  allJobs.map((job) => (
                     <Job key={job._id} job={job} />
                  ))
               }
            </section>

         </div>
      </>
   )
}

export default Browse
