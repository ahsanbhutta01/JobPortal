import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const CompaniesTable = () => {
   const { companiess, searchCompanyByText } = useSelector(store => store.companySlice);
   const [filterCompany, setFilterCompany] = useState(companiess);
   const navigate = useNavigate();

   useEffect(() => {

      const filteredCompany = companiess.length >= 0 && companiess.filter((company) => {
         if (!searchCompanyByText) {
            return true;
         }
         return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
      });

      setFilterCompany(filteredCompany);
   }, [companiess, searchCompanyByText])

   return (
      <div>
         <Table>
            <TableCaption>A list of your recent registered companies</TableCaption>
            <TableHeader>
               <TableRow>
                  <TableHead>Logo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className='text-right'>Action</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>

               {
                  !Array.isArray(filterCompany) || filterCompany.length <= 0 ? (
                     <span>You have not registered any company yet</span>
                  )
                     :
                     (
                        filterCompany.map((company) =>
                        (

                           <TableRow key={company._id}>
                              <TableCell>
                                 <Avatar><AvatarImage src={company?.logo} /></Avatar>
                              </TableCell>
                              <TableCell>{company?.name} </TableCell>
                              <TableCell>{company?.description} </TableCell>
                              <TableCell>{company?.location} </TableCell>
                              <a href={`https://${company?.website}`} target='_blank' rel="noopener noreferrer" className="text-blue-700 hover:underline">
                                 <TableCell>{company?.website} </TableCell>
                              </a>
                              <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
                              <TableCell className='text-right cursor-pointer'>
                                 <Popover>
                                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                    <PopoverContent className='w-32'>
                                       <div onClick={() => navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                                          <Edit2 className="w-4" />
                                          <span>Edit</span>
                                       </div>
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

export default CompaniesTable
