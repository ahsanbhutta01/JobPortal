import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";


const HeroSection = () => {
   const [query, setQuery] = useState("");
   const dispatch = useDispatch();
   const navigate = useNavigate()

   function searchJobHandler(){
      dispatch(setSearchedQuery(query));
      navigate('/browse');
   }
   return (
      <>
         <div className="text-center">
            <section className="flex flex-col gap-5 my-10">
               <span className="px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium mx-auto">
                  No.1 Job Hunt Website
               </span>
               <h2 className="text-5xl font-bold">Search, Apply, & <br /> Get Your&nbsp;
                  <span className="text-[#6A38C2]">DreamJobs</span>
               </h2>
               Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi, aliquam!

               <div className="flex w-[40%] shadow-lg border border-gray-200 pl-4 rounded-full
                  items-center gap-4 mx-auto ">
                  <input
                     type="text"
                     placeholder="Find your dream jobs"
                     value={query}
                     className="outline-none border-none w-full "
                     onChange={(e)=>setQuery(e.target.value)}
                  />
                  <Button className="rounded-r-full  bg-[#6A38C2]" onClick={searchJobHandler}>
                     <Search />
                  </Button>
               </div>
            </section>

         </div>
      </>
   )
}

export default HeroSection
