import axios from 'axios';
import { useEffect } from 'react';
import { COMPANY_API_END_POINT } from '../utils/constant.js';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setSingleCompany } from '@/redux/companySlice.js';

const useGetCompanyById = (id) => {
   const dispatch = useDispatch();

   useEffect(() => {
      const fetchSignleCompany = async () => {
         try {
            
            const res = await axios.get(`${COMPANY_API_END_POINT}/get/${id}`, {
               headers: {
                  'content-type': 'applicaion/json',
               },
               withCredentials: true,
            });

            if (res.data.success) {
               dispatch(setSingleCompany(res.data.company));
            }
         } catch (error) {
            const errorMessage = error.response?.data?.message || 'Something went wrong!';
            toast.error(errorMessage);
         }
      };

      fetchSignleCompany();
   }, [id, dispatch]);

   
};

export default useGetCompanyById;
