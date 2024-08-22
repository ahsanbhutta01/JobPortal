import Navbar from "@/components/shared/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { ArrowBigLeft, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { COMPANY_API_END_POINT } from '../../../utils/constant.js'
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import useGetCompanyById from "@/hooks/useGetCompanyById.jsx"


const CompanySetup = () => {
   const params = useParams();
   useGetCompanyById(params.id);
   const [input, setInput] = useState({
      name: '',
      description: '',
      website: '',
      location: '',
      file: null
   });
   const [loading, setLoading] = useState(false);
 
   const navigate = useNavigate();
   const {singleCompany} = useSelector(store=>store.companySlice)


   function changeEventHandler(e) {
      setInput({ ...input, [e.target.name]: e.target.value });
   }

   function changeFileHandler(e) {
      const file = e.target.files?.[0];
      setInput({ ...input, file })
   }

   async function submitHandler(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', input.name);
      formData.append('description', input.description);
      formData.append('website', input.website);
      formData.append('location', input.location);
      if (input.file) {
         formData.append('file', input.file);
      }

      try {
         setLoading(true);
         const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData,
            {
               headers: {
                  'Content-Type': 'multipart/form-data'
               },
               withCredentials: true
            }
         );
         if (res.data.success) {
            toast.success(res.data.message);
            navigate('/admin/companies');
         }
      } catch (error) {
         console.log(error);
         toast.error(error.response.data.message);
      } finally {
         setLoading(false);
      }

   }

   useEffect(() => {
      setInput({
         name: singleCompany.name || "",
         description: singleCompany.description || "",
         website: singleCompany.website || "",
         location: singleCompany.location || "",
         file: singleCompany.file|| ""
      })
   },[singleCompany])
   return (
      <>
         <Navbar />
         <div className="max-w-xl mx-auto my-10">

            <form onSubmit={submitHandler}>

               <section className="flex items-center gap-5 p-8">
                  <Button
                     variant="outline"
                     className='flex items-center gap-2 text-gray-500 font-semibold'
                     onClick={() => navigate('/admin/companies')}
                  >
                     <ArrowBigLeft />
                     <span>Back</span>
                  </Button>
                  <h1 className="font-bold text-xl">Company Setup</h1>
               </section>
               <section className="grid grid-cols-2 gap-4">

                  <section>
                     <Label>Comapny Name</Label>
                     <Input
                        type="text"
                        name='name'
                        value={input.name}
                        onChange={changeEventHandler}

                     />
                  </section>
                  <section>
                     <Label>Description</Label>
                     <Input
                        type="text"
                        name='description'
                        value={input.description}
                        onChange={changeEventHandler}

                     />
                  </section>
                  <section>
                     <Label>Website</Label>
                     <Input
                        type="text"
                        name='website'
                        value={input.website}
                        onChange={changeEventHandler}

                     />
                  </section>
                  <section>
                     <Label>Location</Label>
                     <Input
                        type="text"
                        name='location'
                        value={input.location}
                        onChange={changeEventHandler}

                     />
                  </section>
                  <section>
                     <Label>Logo</Label>
                     <Input
                        type="file"
                        accept='image/*'
                        name='file'
                        onChange={changeFileHandler}

                     />
                  </section>

               </section>
               {
                  loading ?
                     <Button className="w-full my-4">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait
                     </Button>
                     :
                     <Button className="w-full my-4">Update</Button>
               }
            </form>
         </div>
      </>
   )
}

export default CompanySetup
