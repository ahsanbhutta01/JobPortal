import { useEffect, useState } from "react"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { useDispatch } from "react-redux"
import { setSearchedQuery } from "@/redux/jobSlice"

const filterData = [
   {
      filterType: "Location",
      array: ["Dajal", 'Lahore', 'ISB', "Faisalabad"]
   },
   {
      filterType: "Industry",
      array: ['Frontend Developer', 'Backend Developer', 'FullStack Developer']
   },
   {
      filterType: "Salary",
      array: ["0-40k", '42-1Lakh', '1Lakh-5Lakh']
   }
]
const FilterCard = () => {
   const [selectedValue, setSelectedValue] = useState('');
   const dispatch = useDispatch();

   function changeHandler(value) {
      setSelectedValue(value);
   }
   useEffect(() => {
      dispatch(setSearchedQuery(selectedValue));
   }, [selectedValue])
   return (
      <>
         <div>

            <section className="w-full bg-white p-3 rounded-md">
               <h1 className="font-bold text-lg ">Filter Jobs</h1> <hr className="mt-3" />
               <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                  {
                     filterData.map((data, index) => (
                        <div key={index}>
                           <h1 className="font-bold text-lg">{data.filterType}</h1>
                           {
                              data.array.map((items, idx) => {
                                 const itemId = `r${index}- ${idx}`;
                                 return (
                                    <div className="flex items-center space-x-2 my-2" key={index}>
                                       <RadioGroupItem value={items} id={itemId} />
                                       <Label htmlFor={itemId}>{items}</Label>
                                    </div>

                                 )
                              }

                              )
                           }
                        </div>
                     ))
                  }
               </RadioGroup>
            </section>

         </div>
      </>
   )
}

export default FilterCard
