import connectDB from '../../../../src/databases/config'
import URL from '../../../../src/databases/models/URL'
import { useRouter } from 'next/router';

connectDB()

export default async function handler(req, res) {
  const { method } = req;


  const { shortenedUrl } = req.query; // Access the dynamic part of the URL


  


  switch (method) {
    case 'GET':
      try {
        const url = await URL.findOne({ shortenedUrl });

        if (url) {
          const originalUrl = url.originalUrl;
          res.redirect(301, originalUrl); // Redirect to the original URL
        } else {
          res.status(404).json({ message: "URL not found" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}