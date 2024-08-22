import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { MoreHorizontal } from "lucide-react"
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const sortListingStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
   const { applicants } = useSelector(store => store.applicationSlice);

   async function statusHandler(status,id){
      try {
         const res =  await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, {status}, {
            withCredentials:true
         });
         if(res.data.success){
            toast.success(res.data.message);
         }
      } catch (error) {
         toast.error(error.response.data.message);
      }
   }
   return (
      <>
         <Table>
            <TableCaption>A list of your recent applied user</TableCaption>
            <TableHeader>
               <TableRow>
                  <TableHead>FullName</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Resume</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {
                  applicants && applicants?.applications?.map((item) => (
                     <TableRow key={item._id}>
                        <TableCell>{item?.applicant?.fullname}</TableCell>
                        <TableCell>{item?.applicant?.email}</TableCell>
                        <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                        <TableCell>
                           {
                              item?.applicant?.profile?.resume ? 
                              (
                                 <a href={item?.applicant?.profile?.resume} target="_blank"
                                    className="text-blue-700 underline cursor-pointer"
                                 >
                                    {item?.applicant?.profile?.resumeOriginalName}
                                 </a>
                              ):
                              <span>NA</span>
                           }
                        </TableCell>
                        <TableCell>{item?.applicant?.createdAt?.split("T")[0]}</TableCell>
                        <TableCell className="text-right">
                           <Popover>
                              <PopoverTrigger> <MoreHorizontal /> </PopoverTrigger>
                              <PopoverContent className='w-32'>
                                 {
                                    sortListingStatus.map((status, index) => (
                                       <section onClick={()=>statusHandler(status,item._id)} key={index} className="cursor-pointer my-2">
                                          <span>{status}</span>
                                       </section>
                                    ))
                                 }
                              </PopoverContent>
                           </Popover>


                        </TableCell>
                     </TableRow>
                  ))
               }

            </TableBody>
         </Table>

      </>
   )
}

export default ApplicantsTable
