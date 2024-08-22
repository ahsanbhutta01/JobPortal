import { useSelector } from "react-redux";
import Navbar from "../shared/Navbar"
import FilterCard from "./FilterCard"
import Job from "./Job"
import { useEffect, useState } from "react";
import {motion} from 'framer-motion';


const Jobs = () => {
   const { allJobs, searchedQuery } = useSelector(store => store.jobSlice);
   const [filterJobs, setFilterJobs] = useState(allJobs);

   useEffect(()=>{
      if(searchedQuery){
         const filteredJobs = allJobs.filter((job)=>{
            return job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job?.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job?.location?.toLowerCase().includes(searchedQuery.toLowerCase())

         })
         setFilterJobs(filteredJobs);
      }else{
         setFilterJobs(allJobs);
      }
   },[allJobs, searchedQuery]);
   return (
      <>
         <Navbar />
         <div className="max-w-7xl mx-auto mt-5">

            <section className="flex gap-5">

               <div className="w-20%">
                  <FilterCard />
               </div>

               {
                  filterJobs.length <= 0 ? <span>Job not found</span> :
                     (
                        <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                           <div className="grid grid-cols-3 gap-4">
                              {
                                 filterJobs.map((job) => (
                                    <motion.div 
                                    initial={{opacity:0,x:100}}
                                    animate={{opacity:1, x:0}}
                                    exit={{opacity:0, x:-100}}
                                    transition={{duration:0.3}}
                                    key={job?._id}>
                                       <Job job={job} />
                                    </motion.div>
                                 ))
                              }
                           </div>

                        </div>
                     )

               }
            </section>

         </div>

      </>
   )
}

export default Jobs
