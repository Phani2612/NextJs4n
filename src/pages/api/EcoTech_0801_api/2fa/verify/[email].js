import User_table from "@/src/databases/models/User_table";

import connectDB from "@/src/databases/config";

import speakeasy from 'speakeasy'



connectDB()

export default async function handler(req , res) {


    const { otp } = req.body;
    
    const { email } = req.query;

    console.log("EMail" , email)
  
    // Generate audit trail and timestamp
  
    try {
      // Find the user based on email
      const user = await User_table.findOne({ UT_Email: email });
  
      if (
        user &&
        speakeasy.totp.verify({
          secret: user.UT_TwofaSecret,
          encoding: "base32",
          token: otp,
        })
      ) {
        // Store user ID in session
  
        res.json({ success: true });
      } else {
        res.status(400).json({ success: false, message: "Invalid OTP" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }

    
    
}