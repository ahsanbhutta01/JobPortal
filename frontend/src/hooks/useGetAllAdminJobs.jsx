import axios from 'axios';
import { useEffect } from 'react';
import { JOB_API_END_POINT } from '../utils/constant.js';
import { setAllAdminJobs } from '@/redux/jobSlice.js';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const useGetAllAdminJobs = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      const fetchAllAdminJobs = async () => {
         try {
            
            const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {withCredentials: true});

            if (res.data.success) {
               dispatch(setAllAdminJobs(res.data.jobs));
            }
         } catch (error) {
            const errorMessage = error.response?.data?.message || 'Something went wrong!';
            toast.error(errorMessage);
         }
      };

      fetchAllAdminJobs();
   }, []);

   
};

export default useGetAllAdminJobs;
