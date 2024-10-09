import connectDB from '../../../src/databases/config'
import URL from '../../../src/databases/models/Url'
import { useRouter } from 'next/router';

connectDB()

export async function getServerSideProps(context) {
    const { shortenedUrl } = context.params;
  
    console.log("COntext" , context)

    try {
      const url = await URL.findOne({ shortenedUrl: shortenedUrl });
  
      if (url) {
        // Redirect to the original URL
        return {
          redirect: {
            destination: url.originalUrl,
            permanent: true,
          },
        };
      } else {
        return {
          notFound: true, // 404 Page
        };
      }
    } catch (error) {
      console.error(error);
      return {
        props: { error: 'Internal server error' }, // Handle the error accordingly
      };
    }
  }
  
  const ShortenedUrlPage = () => {
    return null; // You can return null here since it will redirect
  };
  
  export default ShortenedUrlPage;

  