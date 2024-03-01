import axios, { AxiosError } from 'axios';
import { RateLimiter } from 'limiter';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const limiter = new RateLimiter({
  tokensPerInterval: 1,
  interval: 2000 // 2 seconds
});

const accessToken = process.env.ACCESS_TOKEN; // Access token loaded from environment variables

if (!accessToken) {
  console.error('Access token is required');
  process.exit(1);
}

const fetchUserData = async () => {
  try {
    await limiter.removeTokens(1);
    const response = await axios.get(`https://graph.facebook.com/v19.0/me?fields=id,name,last_name&access_token=${accessToken}`);
    
    // Log rate limit headers
    if (response.headers['x-app-usage']) {
      console.log('X-App-Usage Header:', response.headers['x-app-usage']);
    }
    
    console.log(response.data);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 429) {
        const retryAfterHeader = axiosError.response.headers['retry-after'];
        if (retryAfterHeader) {
          const retryAfterSeconds = parseInt(retryAfterHeader);
          if (!isNaN(retryAfterSeconds)) {
            console.log(`Rate limit exceeded. Retrying after ${retryAfterSeconds} seconds...`);
            await delay(retryAfterSeconds * 1000); // Wait for the provided number of seconds before retrying
            await fetchUserData();
          } else {
            console.error('Invalid retry-after header:', retryAfterHeader);
          }
        } else {
          console.error('Retry-after header not found in response:', axiosError.response.headers);
        }
      } else {
        console.error('Error fetching user data:', axiosError.response ? axiosError.response.data : axiosError.message);
      }
    } else {
      console.error('Error fetching user data:', error.message);
    }
  }
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const run = async () => {
  while (true) {
    await fetchUserData();
  }
};

run();
