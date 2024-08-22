import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { useEffect, useState } from "react";
import axios from "axios";
import {USER_API_POINT} from './../../utils/constant.js';
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Signup = () => {
   
   const [input, setInput] = useState({
      fullname: '',
      email: '',
      password: '',
      phoneNumber: '',
      role: '',
      file: ''
   });
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const {loading} = useSelector(store=>store.authSlice);
   const {user} = useSelector(store=>store.authSlice);

   function formHandler(e) {
      setInput({
         ...input,
         [e.target.name]: e.target.value
      })
   }

   function changeFileHandler(e) {
      setInput({
         ...input,
         file: e.target.files?.[0]
      })
   }

   async function submitHandler(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("fullname", input.fullname);
      formData.append("email", input.email);
      formData.append("password", input.password);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("role", input.role);
      if (input.file) {
         formData.append("file", input.file);
      }


      try {
         dispatch(setLoading(true));
         const res = await axios.post(`${USER_API_POINT}/register`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials:true
         });
         if(res.data.success){
            navigate('/login');
            toast.success(res.data.message);
            
         }
      } catch (error) {
         console.log(error);
         console.log(error.response.data.message);
         toast.error(error.response.data.message)
      }finally{
         dispatch(setLoading(false));
      }
   }

   useEffect(()=>{
      if(user){
         navigate('/')
      }
   },[])
   return (
      <>
         <Navbar />
         <div className="flex items-center justify-center max-w-7xl mx-auto">
            <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
               <h1 className="font-bold text-xl mb-5">Signup</h1>
               <section className="my-2">
                  <Label>Full Name</Label>
                  <Input type="text"
                     value={input.fullname}
                     name="fullname"
                     onChange={formHandler}
                     placeholder="john doe"
                  />
               </section>
               <section className="my-2">
                  <Label>Email</Label>
                  <Input
                     type="email"
                     value={input.email}
                     name="email"
                     onChange={formHandler}
                     placeholder="example@gmail.com" />
               </section>
               <section className="my-2">
                  <Label>Password</Label>
                  <Input
                     type="password"
                     value={input.password}
                     name="password"
                     onChange={formHandler}
                     placeholder="password...." />
               </section>
               <section className="my-2">
                  <Label>Phone Number</Label>
                  <Input type="text"
                     value={input.phoneNumber}
                     name="phoneNumber"
                     onChange={formHandler}
                     placeholder="+0000000" />
               </section>

               <section className="flex items-center justify-between my-5">
                  <RadioGroup className="flex items-center gap-4">
                     <div className="flex items-center space-x-2">
                        <Input
                           type="radio"
                           name="role"
                           value="student"
                           checked={input.role === 'student'}
                           onChange={formHandler}
                           className="cursor-pointer"
                        />
                        <Label htmlFor="r1">Student</Label>
                     </div>
                     <div className="flex items-center space-x-2">
                        <Input
                           type="radio"
                           name="role"
                           value="recruiter"
                           checked={input.role === 'recruiter'}
                           onChange={formHandler}
                           className="cursor-pointer"

                        />
                        <Label htmlFor="r2">Recruiter</Label>
                     </div>
                  </RadioGroup>

                  <div className="flex items-center gap-2">
                     <Label>Profile</Label>
                     <Input accept="image/*"
                        onChange={changeFileHandler}
                        type="file"
                        className="cursor-pointer" />
                  </div>
               </section>
               
               {
                  loading ?
                     <Button className="w-full my-4">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait
                     </Button>
                     :
                     <Button className="w-full my-4">Signup</Button>
               }
               <span>Already have an account?&nbsp;
                  <Link to="/login" className="text-blue-600">Login</Link>
               </span>
            </form>
         </div>
      </>
   );
};

export default Signup;
