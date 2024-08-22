// import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AdminJobsTable = () => {
   // const { companiess, searchCompanyByText } = useSelector(store => store.companySlice);
   const {allAdminJobs, searchJobByText} = useSelector(store=>store.jobSlice)
   const [filterJobs, setFilterJobs] = useState(allAdminJobs);
   const navigate = useNavigate();

   useEffect(() => {

      const filteredJob = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
         if (!searchJobByText) {
            return true;
         }
         return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.comapny?.name.toLowerCase().includes(searchJobByText.toLowerCase());
      });

      setFilterJobs(filteredJob);
   }, [allAdminJobs, searchJobByText])

   return (
      <div>
         <Table>
            <TableCaption>A list of your recent posted jobs</TableCaption>
            <TableHeader>
               <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className='text-right'>Action</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>

               {
                  !Array.isArray(filterJobs) || filterJobs.length <= 0 ? (
                     <span>You have not registered any company yet</span>
                  )
                     :
                     (
                        filterJobs.map((job) =>
                        (

                           <TableRow key={job._id}>
                              
                              <TableCell>{job?.company?.name} </TableCell>
                              <TableCell>{job?.title} </TableCell>
                              <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                              <TableCell className='text-right cursor-pointer'>
                                 <Popover>
                                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                    <PopoverContent className='w-32'>
                                       <section onClick={()=>navigate(`/admin/companies/${job._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                                          <Edit2 className="w-4" />
                                          <span>Edit</span>
                                       </section>
                                       <section 
                                          className="flex items-center w-fit gap-2 cursor-pointer"
                                          onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)}
                                       >
                                          <Eye className="w-4"/>
                                          <span>Applicants</span>
                                       </section>
                                    </PopoverContent>
                                 </Popover>
                              </TableCell>
                           </TableRow>
 
                        )
                        )
                     )
               }

            </TableBody>
         </Table>


      </div>
   )
}

export default AdminJobsTable;
