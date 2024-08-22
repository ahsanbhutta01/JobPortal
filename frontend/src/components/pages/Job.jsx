import { Bookmark } from "lucide-react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Avatar, AvatarImage } from "../ui/avatar"
import logo from '../../assets/images/(B.)logo.png'
import { useNavigate } from "react-router-dom"



const Job = ({ job }) => {
   const navigate = useNavigate();
   const daysAgo = (mongoTime) => {
      const createdAt = new Date(mongoTime);
      const currentTime = new Date();
      const timeDifference = currentTime - createdAt;

      return Math.floor(timeDifference / (1000 * 24 * 60 * 60))
   }
   return (
      <>
         <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">

            <section className="flex items-center justify-between">
               <p className="text-sm text-gray-500">
                  {daysAgo(job?.createdAt) === 0 ? "Today" : `${daysAgo(job?.createdAt)} days ago`}
               </p>
               <Button variant="outline" size="icon" className="rounded-full"> <Bookmark /></Button>
            </section>

            <section className="flex items-center gap-2 my-2">
               <Button className="p-6" variant="outline" size="icon">
                  <Avatar>
                     <AvatarImage src={job?.company?.logo} />
                  </Avatar>
               </Button>

               <div>
                  <h1 className="font-medium text-lg">{job?.company?.name}</h1>
                  <p className="text-sm text-gray-500">{job?.location}</p>
               </div>
            </section>

            <section>
               <h1 className="font-bold text-lg my-2">{job?.title}</h1>
               <p className="text-sm text-gray-600">{job?.description}</p>
            </section>

            

            <section className="flex items-center gap-2 mt-4">
               <Badge variant="ghost" className="text-blue-700 font-bold">{job?.position} position</Badge>
               <Badge variant="ghost" className="text-[#F83002] font-bold">{job?.jobType}</Badge>
               <Badge variant="ghost" className="text-[#7209b7] font-bold">{job?.salary} LPA</Badge>
            </section>

            <section className="flex items-center gap-5 mt-4">
               <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
               <Button className="bg-[#7209b7]">Save For Later</Button>
            </section>
         </div>
      </>
   )
}

export default Job
