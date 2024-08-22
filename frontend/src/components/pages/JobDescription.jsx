import { useParams } from "react-router-dom";
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

import { useEffect, useState } from "react";
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from '../../utils/constant.js';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setsingleJob } from "@/redux/jobSlice";
import toast from "react-hot-toast";


const JobDescription = () => {
   const params = useParams();
   const jobId = params.id;
   const { user } = useSelector(store => store.authSlice)
   const dispatch = useDispatch();
   const { singleJob } = useSelector(store => store.jobSlice);

   const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;

   const [isApplied, setIsApplied] = useState(isInitiallyApplied);

   const appliedJobHandler = async ()=>{
      try {
         const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
         if(res.data.success){
            setIsApplied(true);
            const updatedSingleJob =  {...singleJob, applications: [...singleJob.applications, {
               applicant: user?._id
            }]}
            dispatch(setsingleJob(updatedSingleJob));
            toast.success(res.data.message);

         }
      } catch (error) {
         console.log(error);
         toast.error(error.response.data.message);
      }
   }

   useEffect(() => {
      const fetchSingleJob = async () => {
         try {
            const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
            if (res.data.success) {
               dispatch(setsingleJob(res.data.job));
               setIsApplied(res.data.job.applications.some(application=>application.applicant===user?._id))

            }
         } catch (error) {
            console.log(error)

         }
      }
      fetchSingleJob();
   }, [jobId, dispatch, user?._id]);
   return (
      <>
         <div className="max-w-7xl mx-auto my-10">

            <section className="flex items-center justify-between">
               <div>
                  <h1 className="font-bold text-xl">{singleJob?.title}</h1>
                  <div className="flex items-center gap-2 mt-4">
                     <Badge variant="ghost" className="text-blue-700 font-bold">{singleJob?.position} position</Badge>
                     <Badge variant="ghost" className="text-[#F83002] font-bold">{singleJob?.jobType}</Badge>
                     <Badge variant="ghost" className="text-[#7209b7] font-bold">{singleJob?.salary} LPA</Badge>
                  </div>
               </div>

               <Button
                  onClick={isApplied ? null : appliedJobHandler}
                  disabled={isApplied}
                  className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' :
                     'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
               >
                  {isApplied ? 'Already Applied' : 'Apply Now'}
               </Button>

            </section>


            <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>
            <section className="my-4">

               <h1 className="font-bold my-1">
                  Role:
                  <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span>
               </h1>
               <h1 className="font-bold my-1">
                  Location:
                  <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span>
               </h1>
               <h1 className="font-bold my-1">
                  Description:
                  <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span>
               </h1>
               <h1 className="font-bold my-1">
                  Experience:
                  <span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel} Years</span>
               </h1>
               <h1 className="font-bold my-1">
                  Salary:
                  <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span>
               </h1>
               <h1 className="font-bold my-1">
                  Total Applicants:
                  <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span>
               </h1>
               <h1 className="font-bold my-1">
                  Posted Date:
                  <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span>
               </h1>


            </section>



         </div>
      </>
   )
}

export default JobDescription
