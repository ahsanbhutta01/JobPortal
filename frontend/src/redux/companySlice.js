import { createSlice } from '@reduxjs/toolkit';



const companySlice = createSlice({
   name: 'company',
   initialState: {
      singleCompany: null,
      companiess: [],
      searchCompanyByText : ""
   },
   reducers: {
      //Actions
      setSingleCompany: (state, action) => {
         state.singleCompany = action.payload
      },
      setCompanies: (state, action) => {
         state.companiess = action.payload;
      },
      setSearchCompanyByText : (state, action)=>{
         state.searchCompanyByText = action.payload;
      }
   }
});

export const { setSingleCompany, setCompanies, setSearchCompanyByText } = companySlice.actions;
export default companySlice.reducer;