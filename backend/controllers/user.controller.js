import User from './../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getDataUri from '../utils/dataUri.js';
import cloudinary from '../utils/cloudinary.js';

export async function register(req, res) {
   try {
      // console.log("Request body:", req.body);
      // console.log("Request file:", req.file);
      const { fullname, email, password, phoneNumber, role } = req.body;
      if (!fullname || !email || !phoneNumber || !password || !role) {
         return res.status(400).json({
            message: "Something is missing",
            success: false
         })
      };

      // Handle file upload if present
      const file = req.file;
      let profilePhoto = '';
      if (file) {
         const fileUri = getDataUri(file);
         const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
         profilePhoto = cloudResponse.secure_url;
      }


      const userExist = await User.findOne({ email });
      if (userExist) {
         return res.status(400).json({
            message: 'User already exist with this email.',
            success: false
         })
      };
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await User.create({
         fullname,
         email,
         phoneNumber,
         password: hashedPassword,
         role,
         profile: {
            profilePhoto: profilePhoto
         }
      });

      // console.log("User created successfully:", email);
      return res.status(201).json({
         message: "Account created successfully",
         success: true
      });

   } catch (error) {
      console.log(error);
   }
}


export async function login(req, res) {
   try {
      const { email, password, role } = req.body;
      if (!email || !password || !role) {
         return res.status(400).json({
            message: "Something is missing",
            success: false
         });
      };

      let userExist = await User.findOne({ email });
      if (!userExist) {
         return res.status(400).json({
            message: "Incorrect email or password",
            success: false
         });
      };

      const isPasswordMatch = await bcrypt.compare(password, userExist.password);
      if (!isPasswordMatch) {
         return res.status(400).json({
            message: "Incorrect email or password",
            success: false
         });
      };

      //Check role is correct or not
      if (role !== userExist.role) {
         return res.status(400).json({
            message: "Account doesn't exist with this role.",
            success: false
         });
      };

      //Generate token
      const tokenData = {
         userId: userExist._id
      }
      const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });
      
      userExist = {
         _id: userExist._id,
         fullname: userExist.fullname,
         email: userExist.email,
         phoneNumber: userExist.phoneNumber,
         role: userExist.role,
         profile: userExist.profile
      }

      return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000}).json({
         message: `Welcome back ${userExist.fullname}`,
         userExist,
         success: true
      })


   } catch (error) {
      console.log(error)
   }
}


export async function logout(req, res) {
   try {
      return res.status(200).cookie('token', "", { maxAge: 0 }).json({
         message: "Logout successfully.",
         success: true
      });
   } catch (error) {
      console.log(error)
   }
}


export async function updateProfile(req, res) {
   try {
      const { fullname, email, phoneNumber, bio, skills } = req.body;
      const file = req.file;

      let skillsArray = skills ? skills.split(',') : [];

      const userId = req.id; //middleware authentication
      let userExist = await User.findById(userId);

      if (!userExist) {
         return res.status(400).json({
            message: "User not found",
            success: false
         })
      };

      //updating data
      if (fullname) userExist.fullname = fullname;
      if (email) userExist.email = email;
      if (phoneNumber) userExist.phoneNumber = phoneNumber;
      if (bio) userExist.profile.bio = bio;
      if (skills) userExist.profile.skills = skillsArray;

      //cloudinary here and check file upload or not
      if (file) {
         const fileUri = getDataUri(file);
         const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
            resource_type: 'image'
         });
         userExist.profile.resume = cloudResponse.secure_url; //save the cloudinary live url
         userExist.profile.resumeOriginalName = file.originalname; //original file name saved here
      } else {
         // Clear resume fields if no file is provided
         userExist.profile.resume = '';
         userExist.profile.resumeOriginalName = '';
      }

      await userExist.save();
      let userInfo = {
         _id: userExist._id,
         fullname: userExist.fullname,
         email: userExist.email,
         phoneNumber: userExist.phoneNumber,
         role: userExist.role,
         profile: userExist.profile
      };

      return res.status(200).json({
         message: "Profile updated successfully.",
         success: true,
         userInfo
      });
   } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      return res.status(500).json({ message: 'Error uploading file', success: false });
   }
}