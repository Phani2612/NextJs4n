import connectDB from "@/src/databases/config";
import User_table from "@/src/databases/models/User_table";
import { getTimeZone, generateAuditTrail } from "@/src/DateandTime/Timezone";
import { DateTime } from "luxon";
import BCRYPT from "bcrypt"; // Ensure BCRYPT is imported
import speakeasy from "speakeasy"; // Ensure speakeasy is imported
import CryptoJS from "crypto-js"; // Ensure CryptoJS is imported
import secretKey from "@/src/components/Secret";

const FRONTEND = process.env.FRONTEND

connectDB();

export default async function handler(req, res) {
    // Check the request method
    const EnteredUsername = req.body.name;

    

  const EnteredEmail = req.body.email;

  const EnteredPassword = req.body.password;

  const EntereredConfirm = req.body.confirmpassword;
  const Countrychosen = req.body.countryCode;

  const Enteredphone = req.body.phone;

  const DeviceDetails = await generateAuditTrail(req);
  const timeZone = await getTimeZone();
  const now = DateTime.now().setZone(timeZone);
  const timestamp = now.toISO();
  const timeZoneAbbr = now.offsetNameShort;

  const formattedDate = `${timestamp} (${timeZoneAbbr})`;

  console.log(DeviceDetails);

  const Result = await User_table.findOne({
    $or: [{ UT_Email: EnteredEmail }, { UT_Phone: Enteredphone }],
  });

  console.log("Result", Result);

  if (!Result) {
    // To check whether enter password and confirm password matching or not

    const HashedPassword = await BCRYPT.hash(EnteredPassword, 14);

    const secret = speakeasy.generateSecret({ length: 20 });

    new User_table({
      Username: EnteredUsername,

      UT_Email: EnteredEmail,

      UT_Password: HashedPassword,

      UT_CountryCode: Countrychosen,

      UT_Phone: Enteredphone,

      UT_TimeStamp: formattedDate,

      UT_Product_Enabled: 1,

      UT_User_Status: 4,

      UT_Audit_Trail: [DeviceDetails],

      UT_TwofaSecret: secret.base32,
    })
      .save()
      .then(function (output) {
        console.log("Successsfully added");

        const data = output._id.toString();

        const encodedValue = CryptoJS.AES.encrypt(data, secretKey).toString();

        const urlEncodedValue = encodeURIComponent(encodedValue);

        return res.status(200).json({
          status: "success",
          message: "Registration successful",
          redirectUrl: `/EcoTech_302_UserDetails/${urlEncodedValue}`,
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  } else {
    //  The user previously registered

    return res.status(200).json({
      status: "error",
      message: "User already registered",
      redirectUrl: `${FRONTEND}/EcoTech_303_Login`,
    });
  }
}
