import mongoose from "mongoose";




const Individualdetailschema = new mongoose.Schema({
    ID_First_Name: {
      type: String,
    },
  
    ID_Last_Name: {
      type: String,
    },
  
    ID_Phone: {
      type: String,
    },
  
    ID_Profile_Picture: {
      type: Buffer,
    },
  
    ID_Email: {
      type: String,
    },
  
    ID_City: {
      type: String,
    },
  
    ID_Individual_Role: [],
  
    ID_User_Id: {
      type: mongoose.Schema.Types.ObjectId,
    },
  
    ID_Creation_DtTym: {
      type: String,
    },
  
    ID_Audit_Trail: {
      type: [],
    },
  
    ID_Session_Id: {
      type: Number,
    },
  });


  export default mongoose.model.Individual_Details || mongoose.model('Individual_Details' , Individualdetailschema)