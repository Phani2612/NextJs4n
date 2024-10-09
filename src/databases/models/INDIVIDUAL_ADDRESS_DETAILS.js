import mongoose from "mongoose";

const Individual_Address_Schema = new mongoose.Schema({
    IAD_Individual_Id: {
      type: mongoose.Schema.Types.ObjectId,
    },
  
    IAD_Address_type: [],
  
    IAD_Address_Line_1: {
      type: String,
    },
  
    IAD_Address_Line_2: {
      type: String,
    },
  
    IAD_Landmark: {
      type: String,
    },
  
    IAD_Phone_Number: {
      type: String,
    },
  
    IAD_Current_City: {
      type: String,
    },
  
    IAD_State: {
      type: String,
    },
  
    IAD_Country: {
      type: String,
    },
  
    IAD_Pincode: {
      type: Number,
    },
  
    IAD_Session_Id: {
      type: String,
    },
  
    IAD_Creation_DtTym: {
      type: String,
    },
  
    IAD_Audit_Trail: [],
  });
  


  export default mongoose.model.INDIVIDUAL_ADDRESS_DETAILS || mongoose.model( "INDIVIDUAL_ADDRESS_DETAILS",
    Individual_Address_Schema)