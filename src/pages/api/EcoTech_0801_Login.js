
import { getTimeZone , generateAuditTrail } from "@/src/DateandTime/Timezone";

import { DateTime } from "luxon";

import User_table from "@/src/databases/models/User_table";

import connectDB from "@/src/databases/config";

import BCRYPT from "bcrypt";

import CryptoJS from "crypto-js"; // Ensure CryptoJS is imported
import secretKey from "@/src/components/Secret";

connectDB()

export default async function handler(req , res) {



    const { email, password, userAgent, platform } = req.body;

    try {
      const DeviceDetails = await generateAuditTrail(req);
      const timeZone = await getTimeZone();
      const now = DateTime.now().setZone(timeZone);
      const timestamp = now.toISO();
      const timeZoneAbbr = now.offsetNameShort;
      const formattedDate = `${timestamp} (${timeZoneAbbr})`;
      const SESSIONID_info = req.sessionID;
  
      const user = await User_table.findOne({ UT_Email: email });
  
      if (user) {
        const isPasswordCorrect = await BCRYPT.compare(
          password,
          user.UT_Password
        );
  
        if (isPasswordCorrect) {
          // User has MFA enabled (mandatory)
        //   let sessionInformation = await Session_Management.findOne({
        //     SM_User_Id: user._id,
        //   });
  
          const encodedValue = CryptoJS.AES.encrypt(email, secretKey).toString();
          const urlEncodedValue = encodeURIComponent(encodedValue);
  
        //   if (sessionInformation) {
        //     sessionInformation.SM_Session_Token = SESSIONID_info;
        //     sessionInformation.SM_Expiry = Date.now() + 120 * 60 * 1000; // Set new expiry time
        //     sessionInformation.SM_IP_Last_Accessed_Time = "IP";
        //     sessionInformation.SM_Audit_Trail.push(DeviceDetails);
        //     sessionInformation.SM_User_Agent_Browser = userAgent;
        //     sessionInformation.SM_User_Agent_Operating_System = platform;
        //     sessionInformation.SM_User_Geolocation = DeviceDetails;
        //     sessionInformation.SM_Session_Flag = true;
        //     await sessionInformation.save();
        //   } else {
        //     const sessionData = new Session_Management({
        //       SM_User_Id: user._id,
        //       SM_Session_Token: SESSIONID_info,
        //       SM_Product: 1,
        //       SM_IP_Address: "IP",
        //       SM_IP_Login_Time: "IP",
        //       SM_IP_Last_Accessed_Time: "IP",
        //       SM_Expiry: Date.now() + 120 * 60 * 1000,
        //       SM_Creation_DtTym: formattedDate,
        //       SM_Audit_Trail: [DeviceDetails],
        //       SM_User_Agent_Browser: userAgent,
        //       SM_User_Agent_Operating_System: platform,
        //       SM_User_Geolocation: DeviceDetails,
        //       SM_Session_Flag: true,
        //     });
  
        //     await sessionData.save();
        //   }
  
          return res.status(200).json({
            message: "2FA required",
            // redirectUrl: `/EcoTech_304_TwoFactorAuth/${urlEncodedValue}/${SESSIONID_info}`,

            redirectUrl: `/EcoTech_304_TwoFactorAuth/${urlEncodedValue}`,
          });
        } else {
          // Incorrect password
          return res.status(401).json({
            message: "Invalid email or password",
            redirectUrl: `/EcoTech_303_Login`,
          });
        }
      } else {
        // User not found
  
        return res.status(404).json({
          message: "User not found",
          redirectUrl: `/EcoTech_301_UserRegister`,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    
}