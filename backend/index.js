import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './utils/db.js';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/application.route.js';
const app = express();
dotenv.config();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
   origin: ['job-portal-frontend-i6g6ugks9-ahsan-s-projects-96f5cfc9.vercel.app'],
   methods:["GET", "POST", "PUT", "DELETE"]
   credentials: true
}));
app.use(cookieParser());
//api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
   connectDB();
   console.log(`Server is running on ${PORT} `)
})
