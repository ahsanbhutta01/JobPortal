import { useNavigate } from "react-router-dom"
import { Badge } from "../ui/badge"


const LatestJobCards = ({job}) => {
   const navigate = useNavigate();
   return (
      <>
         <div  onClick={()=>navigate(`/description/${job._id}`)} className="p-5  rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">

            <section>
               <h1 className="font-medium text-lg">{job?.company?.name}</h1>
               <p className="text-sm text-gray-500">{job?.location}</p>
            </section>

            <section>
               <h1 className="font-bold text-lg my-2">{job?.title}</h1>
               <p className="text-sm text-gray-600">{job?.description}</p>
            </section>

            <section className="flex items-center gap-2 mt-4">
               <Badge variant="ghost" className="text-blue-700 font-bold">{job?.position} position</Badge>
               <Badge variant="ghost" className="text-[#F83002] font-bold"> {job?.jobType}</Badge>
               <Badge variant="ghost" className="text-[#7209b7] font-bold">{job?.salary} LPA</Badge>
            </section>

         </div>
      </>
   )
}

export default LatestJobCards
