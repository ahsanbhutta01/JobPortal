import axios from 'axios';
import { useEffect } from 'react';
import { JOB_API_END_POINT } from '../utils/constant.js';
import { setAllJobs } from '@/redux/jobSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const useGetAllJobs = () => {
   const dispatch = useDispatch();
   const {searchedQuery}  = useSelector(store=>store.jobSlice);

   useEffect(() => {
      const fetchAllJobs = async () => {
         try {
            
            const res = await axios.get(`${JOB_API_END_POINT}/getjob?keyword=${searchedQuery}`, {withCredentials: true});

            if (res.data.success) {
               dispatch(setAllJobs(res.data.jobs));
            }
         } catch (error) {
            const errorMessage = error.response?.data?.message || 'Something went wrong!';
            toast.error(errorMessage);
         }
      };

      fetchAllJobs();
   }, [dispatch]);

   
};

export default useGetAllJobs;
