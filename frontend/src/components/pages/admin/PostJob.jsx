import Navbar from "@/components/shared/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { JOB_API_END_POINT } from "@/utils/constant"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

// const companyArray = [];
const PostJob = () => {
   const [input, setInput] = useState({
      title: '',
      description: '',
      requirements: '',
      salary: '',
      location: '',
      jobType: '',
      experience: '',
      position: 0,
      companyId: ''
   });

   const { companiess } = useSelector(store => store.companySlice);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   function changeEventHandler(e) {
      setInput({ ...input, [e.target.name]: e.target.value })
   }

   function selectChangeHandler(value){
      const selectedCompany = companiess.find((company)=>company?.name?.toLowerCase() === value);
      setInput({...input, companyId:selectedCompany._id})
   }

   async function submitHandler(e){
      e.preventDefault();

      try {
         setLoading(true);
         const res = await axios.post(`${JOB_API_END_POINT}/postjob`, input, {
            headers:{
               'Content-Type': 'application/json'
            },
            withCredentials:true
         });
         if( res.data.success){
            toast.success(res.data.message);
            navigate('/admin/jobs');
         }
      } catch (error) {
         // console.log(error);
         toast.error(error.response.data.message);
      }finally{
         setLoading(false);
      }


   }
   return (
      <>
         <Navbar />

         <div className="flex items-center justify-center w-screen my-5">
            <form onSubmit={submitHandler} className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md">
               <section className="grid grid-cols-2 gap-2">

                  <section >
                     <Label>Title</Label>
                     <Input
                        type="text"
                        name='title'
                        value={input.title}
                        onChange={changeEventHandler}
                        className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                     />
                  </section>
                  <section >
                     <Label>Description</Label>
                     <Input
                        type="text"
                        name='description'
                        value={input.description}
                        onChange={changeEventHandler}
                        className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                     />
                  </section>
                  <section >
                     <Label>Requirements</Label>
                     <Input
                        type="text"
                        name='requirements'
                        value={input.requirements}
                        onChange={changeEventHandler}
                        className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                     />
                  </section>
                  <section >
                     <Label>Salary</Label>
                     <Input
                        type="text"
                        name='salary'
                        value={input.salary}
                        onChange={changeEventHandler}
                        className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                     />
                  </section>
                  <section >
                     <Label>Location</Label>
                     <Input
                        type="text"
                        name='location'
                        value={input.location}
                        onChange={changeEventHandler}
                        className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                     />
                  </section>
                  <section >
                     <Label>Job Type</Label>
                     <Input
                        type="text"
                        name='jobType'
                        value={input.jobType}
                        onChange={changeEventHandler}
                        className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                     />
                  </section>
                  <section >
                     <Label>Experience Level</Label>
                     <Input
                        type="text"
                        name='experience'
                        value={input.experience}
                        onChange={changeEventHandler}
                        className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                     />
                  </section>
                  <section >
                     <Label>No of Position</Label>
                     <Input
                        type="number"
                        min='0'
                        name='position'
                        value={input.position}
                        onChange={changeEventHandler}
                        className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                     />
                  </section>
                  {
                     companiess.length > 0 && (
                        <Select onValueChange={selectChangeHandler}>
                           <SelectTrigger>
                              <SelectValue placeholder='Select a company' />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectGroup>
                                 {
                                    companiess.map((company)=>(
                                       <SelectItem value={company?.name?.toLowerCase()} key={company._id}>
                                          {company.name}
                                       </SelectItem>
                                    ))
                                 }
                              </SelectGroup>
                           </SelectContent>
                        </Select>
                     )
                  }


               </section>
               {
                  loading ?
                     <Button className="w-full my-4">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait
                     </Button>
                     :
                     <Button className="w-full my-4">Post New Job</Button>
               }
               {
                  companiess.length === 0 && <p className="text-sm text-red-600 font-bold text-center my-3">Please register a company first,  before posting job</p>
               }
            </form>
         </div>
      </>
   )
}

export default PostJob
