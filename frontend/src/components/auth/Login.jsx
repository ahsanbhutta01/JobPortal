import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { useEffect, useState } from "react";
import { USER_API_POINT } from './../../utils/constant.js'
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
   const {user} = useSelector(store=>store.authSlice);
   const [input, setInput] = useState({
      email: '',
      password: '',
      role: '',
   });
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { loading } = useSelector(store => store.authSlice);
   function formHandler(e) {
      setInput({
         ...input,
         [e.target.name]: e.target.value
      })
   }

   async function submitHandler(e) {
      e.preventDefault();

      try {
         dispatch(setLoading(true));
         const res = await axios.post(`${USER_API_POINT}/login`, input, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
         });
         if (res.data.success) {
            dispatch(setUser(res.data.userExist))
            toast.success(res.data.message);
            navigate('/');
         }
      } catch (error) {
         console.log(error);
         toast.error(error.response.data.message);
      } finally {
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
               <h1 className="font-bold text-xl mb-5">Login</h1>
               <section className="my-2">
                  <Label>Email</Label>
                  <Input
                     type="email"
                     value={input.email}
                     name="email"
                     onChange={formHandler}
                     placeholder="example@gmail.com"
                  />
               </section>
               <section className="my-2">
                  <Label>Password</Label>
                  <Input
                     type="password"
                     value={input.password}
                     name="password"
                     onChange={formHandler}
                     placeholder="password...."
                  />
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

               </section>
               {
                  loading ?
                     <Button className="w-full my-4">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait
                     </Button>
                     :
                     <Button className="w-full my-4">Login</Button>
               }

               <span> Don&apos;t have an account? &nbsp;
                  <Link to="/signup" className="text-blue-600">Signup</Link>
               </span>
            </form>
         </div>
      </>
   );
};

export default Login;
