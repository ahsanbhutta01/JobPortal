import Navbar from "../shared/Navbar"
import { Avatar, AvatarImage } from "../ui/avatar"
import logo from '../../assets/images/(B.)logo.png'
import { Button } from "../ui/button"
import { Contact, Mail, Pen } from "lucide-react"
import { Badge } from "../ui/badge"
import { Label } from "../ui/label"
import AppliedJobTable from "./AppliedJobTable"
import { useState } from "react"
import UpdateProfileDialog from "./UpdateProfileDialog"
import { useSelector } from "react-redux"
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs"


const isResume = true;
const Profile = () => {
   useGetAppliedJobs();
   const [open, setOpen] = useState(false);
   const { user } = useSelector(store => store.authSlice);
   
   
   return (
      <>
         <Navbar />

         <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">

            <section className="flex justify-between gap-4">

               <section className="flex items-center gap-4">
                  <Avatar className="h-24  w-24">
                     <AvatarImage src={logo} />
                  </Avatar>
                  <div>
                     <h1 className="font-medium text-xl">{user?.fullname}</h1>
                     <p>{user?.profile?.bio}</p>
                  </div>
               </section>
               <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
                  <Pen />
               </Button>

            </section>

            <section className="my-5">

               <div className="flex items-center gap-3 my-2">
                  <Mail />
                  <span>{user?.email}</span>
               </div>
               <div className="flex items-center gap-3 my-2">
                  <Contact />
                  <span>{user?.phoneNumber}</span>
               </div>

            </section>

            <section className="my-5">

               <h1 className="font-bold">Skills</h1>
               <div className="flex items-center gap-1 my-2">
                  {
                     user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
                        :
                        <span>NA</span>
                  }
               </div>

            </section>

            <section className="grid w-full max-w-sm items-center gap-1.5">
               <Label className="text-medium font-bold">Resume</Label>

               {
                  isResume ? <a target="_blank"
                  rel="noopener noreferrer"
                     href={user?.profile?.resume}
                     className="text-blue-500 w-full hover:underline cursor-pointer">
                     {user?.profile?.resumeOriginalName}
                  </a> :
                  <span>NA</span>
                  
               }
               
            </section>

         </div>

         <div className="max-w-4xl mx-auto bg-white rounded-2xl my-7">
            <h1 className="font-bold text-lg my-4">Applied Jobs</h1>
            <AppliedJobTable />

         </div>
         <UpdateProfileDialog open={open} setOpen={setOpen} />
      </>
   )
}

export default Profile
