import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { NavLink, useNavigate } from "react-router-dom"
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { USER_API_POINT } from '../../utils/constant.js'
import { setUser } from "@/redux/authSlice";


const Navbar = () => {
   const { user } = useSelector(store => store.authSlice);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   async function logoutHandler() {
      try {
         const res = await axios.get(`${USER_API_POINT}/logout`, { withCredentials: true });
         if (res.data.success) {
            dispatch(setUser(null));
            navigate('/');
            toast.success(res.data.message);

         }
      } catch (error) {
         console.log(error);
         toast.error(error.response.data.message);
      }
   }
   return (
      <>
         <div className='bg-white'>
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">

               <section>
                  <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
               </section>

               <section className="flex items-center gap-12">
                  <ul className="flex font-medium items-center gap-5">
                     {
                        user && user.role === 'recruiter' ?
                           (
                              <>
                                 <li>
                                    <NavLink to='/admin/companies'
                                       className={({ isActive }) => isActive ? 'bg-blue-400 p-2 rounded' : ''}
                                    >Companies</NavLink>
                                 </li>
                                 <li>
                                    <NavLink to='/admin/jobs'
                                       className={({ isActive }) => isActive ? 'bg-blue-400 p-2 rounded' : ''}
                                    >Jobs</NavLink>
                                 </li>
                              </>
                           ) :
                           (
                              <>
                                 <li>
                                    <NavLink to='/'
                                       className={({ isActive }) => isActive ? 'bg-blue-400 p-2 rounded' : ''}
                                    >Home</NavLink>
                                 </li>
                                 <li>
                                    <NavLink to='/jobs'
                                       className={({ isActive }) => isActive ? 'bg-blue-400 p-2 rounded' : ''}
                                    >Jobs</NavLink>
                                 </li>
                                 <li>
                                    <NavLink to='/browse'
                                       className={({ isActive }) => isActive ? 'bg-blue-400 p-2 rounded' : ''}
                                    >Browse </NavLink>
                                 </li>
                              </>
                           )
                     }

                  </ul>

                  {
                     !user ? (
                        <div className="flex items-center gap-2">
                           <NavLink to='/login'>
                              <Button variant="outline">Login</Button>
                           </NavLink>
                           <NavLink to='/signup'>
                              <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button>
                           </NavLink>
                        </div>
                     ) : (
                        <Popover>
                           <PopoverTrigger asChild>
                              <Avatar className="cursor-pointer">
                                 <AvatarImage src={user?.profile?.profilePhoto ? user?.profile?.profilePhoto : ' https://github.com/shadcn.png'} alt="@shadcn" />
                              </Avatar>
                           </PopoverTrigger>
                           <PopoverContent className="w-80">

                              <div>
                                 <div className="flex gap-2 space-y-2">
                                    <Avatar className="cursor-pointer">
                                       <AvatarImage src={user?.profile?.profilePhoto ? user?.profile?.profilePhoto : ' https://github.com/shadcn.png'} alt="@shadcn" />
                                    </Avatar>
                                    <div>
                                       <h4 className="font-medium">{user?.fullname}</h4>
                                       <p className="text-sm text-muted-foreground">
                                          {user?.profile?.bio}
                                       </p>
                                    </div>
                                 </div>

                                 <div className="flex flex-col text-gray-600">
                                    {
                                       user && user.role === 'student' &&
                                       (
                                          <div className="flex w-fit items-center gap-2 cursor-pointer">
                                             <User2 />
                                             <Button variant="link"><NavLink to="/profile">View profile</NavLink></Button>
                                          </div>
                                       )
                                    }
                                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                                       <LogOut />
                                       <Button onClick={logoutHandler} variant="link" >Logout</Button>
                                    </div>
                                 </div>
                              </div>
                           </PopoverContent>
                        </Popover>
                     )
                  }

               </section>
            </div>

         </div>
      </>
   )
}

export default Navbar















{/* <li><Link>Home</Link></li>
                     <li><Link>Jobs</Link></li>
                     <li><Link>Browse</Link></li> */}