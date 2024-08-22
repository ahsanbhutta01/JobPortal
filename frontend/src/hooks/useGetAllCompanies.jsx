import axios from 'axios';
import { useEffect } from 'react';
import { COMPANY_API_END_POINT } from '../utils/constant.js';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setCompanies} from '@/redux/companySlice.js';

const useGetAllCompanies = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      const fetchAllCompanies = async () => {
         try {
            
            const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
               withCredentials: true,
            });

            if (res.data.success) {
               dispatch(setCompanies(res.data.companies));
            }
         } catch (error) {
            const errorMessage = error.response?.data?.message || 'Something went wrong!';
            toast.error(errorMessage);
         }
      };

      fetchAllCompanies();
   }, []);

   
};

export default useGetAllCompanies;
