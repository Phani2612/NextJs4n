import connectDB from "@/src/databases/config";

import Individual_Details from "@/src/databases/models/Individual_Details";

import INDIVIDUAL_ADDRESS_DETAILS from "@/src/databases/models/INDIVIDUAL_ADDRESS_DETAILS";

import User_table from "@/src/databases/models/User_table";

import { getTimeZone , generateAuditTrail} from "@/src/DateandTime/Timezone";

import { DateTime } from "luxon";

connectDB()


export default async function handler(req,res) {


    const { values, UID } = req.body;


    const FRONTEND = process.env.FRONTEND

    console.log("Body details" , req.body)
  
  
    try {
      // Fetch the user from the database
      const Data_User_Table = await User_table.findOne({ _id: UID });
  
      if (!Data_User_Table) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }
  
      // Get current date and time
      const timeZone = await getTimeZone();
      const now = DateTime.now().setZone(timeZone);
      const timestamp = now.toISO();
      const timeZoneAbbr = now.offsetNameShort;
      const formattedDate = `${timestamp} (${timeZoneAbbr})`;
  
      // Generate audit trail
      const DeviceDetails = await generateAuditTrail(req);
  
      // Save individual details
      const individualDetails = new Individual_Details({
        ID_First_Name: values.firstName,
        ID_Last_Name: values.lastName,
        ID_Individual_Role: values.userType, // Assuming userType is an array
        ID_City: values.city,
        ID_Email: Data_User_Table.UT_Email,
        ID_Phone: Data_User_Table.UT_Phone,
        ID_User_Id: UID,
        ID_Creation_DtTym: formattedDate,
        ID_Audit_Trail: [DeviceDetails],
      });
  
      const savedIndividualDetails = await individualDetails.save();
      console.log("Successfully added individual details");
  
      // Save address details
      const individualAddressDetails = new INDIVIDUAL_ADDRESS_DETAILS({
        IAD_Individual_Id: savedIndividualDetails._id,
        IAD_Address_type: values.addressType, // Assuming addressType is an array
        IAD_Address_Line_1: values.addressLine1,
        IAD_Address_Line_2: values.addressLine2,
        IAD_Landmark: values.landmark,
        IAD_Phone_Number: savedIndividualDetails.ID_Phone,
        IAD_Current_City: values.city,
        IAD_State: values.state,
        IAD_Country: values.country,
        IAD_Pincode: values.pincode,
        IAD_Session_Id: "session123",
        IAD_Creation_DtTym: formattedDate,
        IAD_Audit_Trail: [DeviceDetails],
      });
  
      await individualAddressDetails.save();
      console.log("Successfully added address details");
  
      return res.status(200).json({
        status: "success",
        message: "Form data submitted successfully",
        redirectUrl: `/EcoTech_303_Login`,
      });
    } catch (error) {
      console.error("Error during submission:", error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }


    
}