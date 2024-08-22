import { useDispatch } from "react-redux";
import { Button } from "../ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
   "Frontend Developer",
   "Backend Developer",
   "Data Science",
   "Figma",
   "Artificial Intelligence"
]
const CategoryCarouel = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   function searchJobHandler(query) {
      dispatch(setSearchedQuery(query));
      navigate('/browse');
   }
   
   return (
      <>
         <Carousel className="w-full max-w-xl mx-auto my-20">
            <CarouselContent>
               {
                  category.map((val, index) => (
                     <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
                        <Button onClick={()=>searchJobHandler(val)} variant="outline" className="rounded-full border-gray-300">
                           {val}
                        </Button>
                     </CarouselItem>
                  ))
               }
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
         </Carousel>
      </>
   )
}

export default CategoryCarouel
