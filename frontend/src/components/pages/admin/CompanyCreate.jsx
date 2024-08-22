import Navbar from "@/components/shared/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import {COMPANY_API_END_POINT} from '../../../utils/constant.js'
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { setSingleCompany } from "@/redux/companySlice.js"


const CompanyCreate = () => {
   const navigate = useNavigate();
   const [companyName, setCompanyname] = useState('');
   const dispatch = useDispatch();

   async function registerNewCompany() {
      try {
         const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
            headers: {
               'Content-Type': 'application/json'
            },
            withCredentials: true
         });
         
         if (res?.data?.success) {
            dispatch(setSingleCompany(res?.data?.company));
            toast.success(res?.data?.message);
            const companyId = res?.data?.company?._id;
            navigate(`/admin/companies/${companyId}`)
         }
      } catch (error) {
         console.log(error);
         toast.error(error.response.data.message)
      }
   }
   return (
      <div>
         <Navbar />

         <div className="max-w-4xl mx-auto">

            <section className="my-10">
               <h1 className="font-bold text-2xl">Your Company Name</h1>
               <p className="text-gray-500">What would you like to give your comapny name</p>
            </section>
            <section className="-my-2">
               <Label>Company Name</Label>
               <Input
                  type='text'
                  className='my-2'
                  placeholder="Microsoft, Google etc"
                  value={companyName}
                  writingsuggestions="true" 
                  onChange={(e) => setCompanyname(e.target.value)}
               />
            </section>
            <section className="flex items-center gap-2 my-10">
               <Button variant='outline' onClick={() => navigate('/admin/companies')}>Cancel</Button>
               <Button onClick={registerNewCompany}>Continue</Button>
            </section>

         </div>

      </div>
   )
}

export default CompanyCreate
