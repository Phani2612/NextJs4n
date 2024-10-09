import mongoose from 'mongoose'

const RegisterSchema = new mongoose.Schema({
    UT_Email: {
      type: String,
    },
  
    UT_Password: {
      type: String,
    },
  
    UT_CountryCode: {
      type: String,
    },
  
    UT_Phone: {
      type: String,
    },
  
    UT_TwofaSecret: {
      type: String,
    },
  
    UT_Creation_DtTym: {
      type: String,
    },
  
    UT_Product_Enabled: {
      type: Number,
    },
  
    UT_Audit_Trail: {
      type: [],
    },
  
    UT_User_Status: {
      type: Number,
    },
  
    UT_TimeStamp: {
      type: String,
    },
  });


  export default mongoose.models.User_table || mongoose.model('User_table', RegisterSchema);

  