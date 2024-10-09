import User_table from "@/src/databases/models/User_table";
import connectDB from "@/src/databases/config";
import qrcode from "qrcode"; // Ensure you have this import for qrcode

connectDB();

export default async function handler(req, res) {
  // Use req.query to access the parameter
  const { email } = req.query;

  console.log('email' , email)


  try {
    // Fetch the user from the database
    const user = await User_table.findOne({ UT_Email: email });

  

    if (user && user.UT_TwofaSecret) {
      // Ensure you use the correct variable for UserEmail
      const otpauth_url = `otpauth://totp/ExampleApp:${email}?secret=${user.UT_TwofaSecret}&issuer=ExampleApp`;
      const qrCode = await qrcode.toDataURL(otpauth_url);
      res.json({ qrCode });
    } else {
      res.status(404).json({ message: "2FA not set up" });
    }
  } catch (error) {
    console.error('Error fetching user or generating QR code:', error);
    res.status(500).json({ message: "Internal server error" });
  }
}
