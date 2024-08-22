import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
   name:'job',
   initialState:{
      allJobs:[],
      allAdminJobs:[],
      allAppliedJobs:[],
      singleJob:null,
      searchJobByText: "",
      searchedQuery: ''
      
   },
   reducers:{
      //actions
      setAllJobs:(state,action)=>{
         state.allJobs=action.payload;
      },

      setsingleJob:(state,action)=>{
         state.singleJob = action.payload;
      },
      setAllAdminJobs:(state,action)=>{
         state.allAdminJobs = action.payload
      },
      setSearchJobBytext: (state,action)=>{
         state.searchJobByText = action.payload
      },
      setAllAppliedJobs:(state,action)=>{
         state.allAppliedJobs=action.payload;
      },
      setSearchedQuery : (state, action)=>{
         state.searchedQuery = action.payload;
      }
   }
})

export const 
{
   setAllJobs,
   setsingleJob,
   setAllAdminJobs,
   setSearchJobBytext,
   setAllAppliedJobs,
   setSearchedQuery
} = jobSlice.actions;
export default jobSlice.reducer;