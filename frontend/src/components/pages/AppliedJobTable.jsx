import { useSelector } from "react-redux"
import { Badge } from "../ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"


const AppliedJobTable = () => {
   const { allAppliedJobs } = useSelector(store => store.jobSlice);
   if (!allAppliedJobs || allAppliedJobs.length <= 0) {
      return <span>You haven&#39;t applied any job yet</span>
   }
   return (
      <>
         <Table>
            <TableCaption>List of your applied jobs</TableCaption>
            <TableHeader>
               <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Job Role</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead className="text-right">Status</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {

                  allAppliedJobs.map((appliedJob) => (
                     <TableRow key={appliedJob._id}>
                        <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                        <TableCell>{appliedJob?.job?.title}</TableCell>
                        <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                        <TableCell className="text-right">
                           <Badge
                              className={`${appliedJob?.status === 'rejected' ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}
                           >
                              {appliedJob?.status}
                           </Badge>

                        </TableCell>
                     </TableRow>
                  ))
               }
            </TableBody>
         </Table>
      </>
   )
}

export default AppliedJobTable
