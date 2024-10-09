import connectDB from '../../databases/config'

import Url from '../../databases/models/Url'

connectDB()

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { originalUrl, shortenedUrl } = req.body;

 
      
  
      try {
        const url = new Url({ originalUrl, shortenedUrl });
        await url.save();
        res.status(201).json({ message: 'URL saved successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }