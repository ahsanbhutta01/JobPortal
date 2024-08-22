
import useGetAllJobs from '@/hooks/useGetAllJobs'
import Navbar from '../shared/Navbar'
import CategoryCarouel from './CategoryCarouel'
import Footer from './Footer'
import HeroSection from './HeroSection'
import LatestJobs from './LatestJobs'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
   const navigate = useNavigate();
   useGetAllJobs();
   const {user} = useSelector(store=>store.authSlice);

   useEffect(()=>{
      if(user?.role==='recruiter'){
         navigate('/admin/companies');
      }
   },[])
   return (
      <>
         <div className=''>
            <Navbar />
            <HeroSection />
            <CategoryCarouel />
            <LatestJobs />
            <Footer />
         </div>
      </>
   )
}

export default Home
