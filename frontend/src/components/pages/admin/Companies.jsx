import Navbar from "@/components/shared/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CompaniesTable from "./CompaniesTable"
import { useNavigate } from "react-router-dom"
import useGetAllCompanies from "../../../hooks/useGetAllCompanies.jsx"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setSearchCompanyByText } from "@/redux/companySlice"



const Companies = () => {
   useGetAllCompanies();
   const [input, setInput] = useState("");
   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(()=>{
      dispatch(setSearchCompanyByText(input))
   },[input])
   return (
      <>
         <Navbar />

         <div className="max-w-6xl mx-auto my-10">

            <section className="flex items-center justify-between my-5">
               <Input
                  className='w-fit'
                  placeholder='Filter by name'
                  value={input}
                  onChange = {(e)=>setInput(e.target.value)}
               />
               <Button onClick={()=>navigate('/admin/companies/create')}>New Company</Button>
            </section>
            <CompaniesTable />

         </div>
      </>
   )
}

export default Companies
