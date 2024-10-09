
import UAParser from "ua-parser-js";

import axios from "axios";

export async function getTimeZone() {
    try {
      // Make a GET request to ip-api.com to get location details based on IP address
      const response = await axios.get("http://ip-api.com/json/");
  
      if (response.status === 200) {
        // Extract timezone from the response
        const { timezone } = response.data;
        return timezone;
      } else {
        console.error(
          "Failed to fetch timezone:",
          response.status,
          response.statusText
        );
        return "UTC"; // Default to UTC if fetching timezone fails
      }
    } catch (error) {
      console.error("Error fetching timezone:", error.message);
      return "UTC"; // Default to UTC in case of any error
    }
  }



  export async function generateAuditTrail(req) {
    try {
      const ipAddress =
        req.ip ||
        req.connection.remoteAddress ||
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress;
      const userAgent = req.headers["user-agent"];
      const parser = new UAParser(userAgent);
      const result = parser.getResult();
  
      // Fetch location details using ip-api
      const locationResponse = await axios.get(`http://ip-api.com/json/`);
      let locationData = {};
  
      if (locationResponse.status === 200) {
        locationData = {
          country: locationResponse.data.country,
          region: locationResponse.data.regionName,
          city: locationResponse.data.city,
          zip: locationResponse.data.zip,
          lat: locationResponse.data.lat,
          lon: locationResponse.data.lon,
          timezone: locationResponse.data.timezone,
        };
      } else {
        console.error(
          "Failed to fetch location data:",
          locationResponse.status,
          locationResponse.statusText
        );
      }
  
      return {
        ipAddress: ipAddress,
        browser: `${result.browser.name} ${result.browser.version}`,
        os: `${result.os.name} ${result.os.version}`,
        device: result.device.model
          ? `${result.device.vendor} ${result.device.model}`
          : "Unknown",
        location: locationData,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error generating audit trail:", error.message);
      return {};
    }
  }