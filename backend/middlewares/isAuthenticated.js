import jwt from "jsonwebtoken";

export async function isAuthenticated(req, res, next) {
   try {
      const tokenn = await req.cookies.token;
      // console.log("Token from cookies:", tokenn);
      if (!tokenn) {
         return res.status(401).json({
            message: "User not authenticated",
            success: false
         });
      }

      const decode = jwt.verify(tokenn, process.env.SECRET_KEY);
      if (!decode) {
         return res.status(401).json({
            message: "Invalid token",
            success: false
         });
      }

      req.id = decode.userId;
      next();
   } catch (error) {
      console.error("Authentication error:", error.message);
      return res.status(500).json({
         message: "Authentication error",
         success: false
      });
   }
}
