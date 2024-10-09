
import mongoose from 'mongoose';

// Define User schema and model
const UrlSchema = new mongoose.Schema({
  

    shortenedUrl: String,
  originalUrl: String,


});

export default mongoose.models.Url || mongoose.model('Url', UrlSchema);
