import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { USER_API_POINT } from '../../utils/constant.js'
import toast from "react-hot-toast"


// eslint-disable-next-line react/prop-types
const UpdateProfileDialog = ({ open, setOpen }) => {
   const [loading, setLoading] = useState(false);
   const { user } = useSelector(store => store.authSlice);
   const dispatch = useDispatch();
   const [input, setInput] = useState({
      fullname: user?.fullname,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      bio: user?.profile?.bio,
      skills: user?.profile?.skills?.map((skill) => skill),
      file: user?.profile?.resume

   })

   async function changeEventHandler(e) {
      setInput({
         ...input,
         [e.target.name]: e.target.value
      })
   }

   async function submitHandler(e) {
      e.preventDefault()
      const formData = new FormData();
      formData.append('fullname', input.fullname);
      formData.append('email', input.email);
      formData.append('phoneNumber', input.phoneNumber);
      formData.append('bio', input.bio);
      formData.append('skills', input.skills);
      if (input.file) {
         formData.append('file', input.file)
      }

      try {
         const res = await axios.post(`${USER_API_POINT}/profile/update`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
         })
         

         if (res.data.success) {
            dispatch({
               type: "UPDATE_PROFILE_SUCCESS",
               payload: res.data.userInfo,
            });
            toast.success(res.data.message);
            
         }
      } catch (error) {
         console.log(error)
         toast.error(error.response.data.message)
      } finally {
         setLoading(false); 
         setOpen(false);
      }

   }

   function fileChangeHandler(e) {
      setInput({
         ...input,
         file: e.target.files?.[0]
      })
   }

   return (
      <>
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425]" >
               <DialogHeader>
                  <DialogTitle>Update Profile</DialogTitle>
                  <DialogDescription>
                     Please update your profile information
                  </DialogDescription>
               </DialogHeader>
               <form onSubmit={submitHandler}>
                  <div className="grid gap-4 py-4">

                     <section className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="fullname" className="text-right">Fullname</Label>
                        <Input
                           id="fullname"
                           name="fullname"
                           value={input.fullname}
                           onChange={changeEventHandler}
                           type="text"
                           className="col-span-3"
                        />
                     </section>
                     <section className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">Email</Label>
                        <Input
                           id="email"
                           name="email"
                           value={input.email}
                           onChange={changeEventHandler}
                           type="email"
                           className="col-span-3"
                        />
                     </section>
                     <section className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phoneNumber" className="text-right">phoneNumber</Label>
                        <Input
                           id="phoneNumber"
                           name="phoneNumber"
                           value={input.phoneNumber}
                           onChange={changeEventHandler}
                           type="text"
                           className="col-span-3"
                        />
                     </section>
                     <section className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bio" className="text-right">Bio</Label>
                        <Input
                           id="bio"
                           name="bio"
                           value={input.bio}
                           onChange={changeEventHandler}
                           className="col-span-3"
                        />
                     </section>
                     <section className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="skills" className="text-right">Skills</Label>
                        <Input
                           id="skills"
                           name="skills"
                           value={input.skills}
                           onChange={changeEventHandler}
                           className="col-span-3"
                        />
                     </section>
                     <section className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="file" className="text-right">Resume</Label>
                        <Input
                           id="file"
                           name="file"
                           type="file"
                           onChange={fileChangeHandler}
                           accept="application/pdf"
                           className="col-span-3"
                        />
                     </section>
                  </div>

                  <DialogFooter>
                     {
                        loading ?
                           <Button className="w-full my-4">
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait
                           </Button>
                           :
                           <Button type="submit" className="w-full my-4" onClick={() => setLoading(true)}>Update</Button>
                     }
                  </DialogFooter>
               </form>
            </DialogContent>
         </Dialog>
      </>
   )
}

export default UpdateProfileDialog
