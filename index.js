"use strict";
//import axios, { AxiosError } from 'axios';
//import { RateLimiter } from 'limiter';
//import dotenv from 'dotenv';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//dotenv.config(); // Load environment variables from .env file
//const limiter = new RateLimiter({
//  tokensPerInterval: 1,
//  interval: 2000 // 2 seconds
//});
//const accessToken = process.env.ACCESS_TOKEN; // Access token loaded from environment variables
//if (!accessToken) {
//  console.error('Access token is required');
//  process.exit(1);
//}
//const fetchUserData = async () => {
//  try {
//    await limiter.removeTokens(1);
//    const response = await axios.get(`https://graph.facebook.com/v19.0/me?fields=id,name,last_name&access_token=${accessToken}`);
//    console.log(response.data);
//  } catch (error: any) {
//    if (axios.isAxiosError(error)) {
//      const axiosError = error as AxiosError;
//      if (axiosError.response && axiosError.response.status === 429) {
//        const retryAfter = axiosError.response.headers['retry-after'];
//        console.log(`Rate limit exceeded. Retrying after ${retryAfter} seconds...`);
//        await delay(parseInt(retryAfter) * 1000); // Wait for the provided number of seconds before retrying
//        await fetchUserData();
//      } else {
//        console.error('Error fetching user data:', axiosError.response ? axiosError.response.data : axiosError.message);
//      }
//    } else {
//      console.error('Error fetching user data:', error.message);
//    }
//  }
//};
//const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
//const run = async () => {
//  while (true) {
//    await fetchUserData();
//  }
//};
//run();
//import axios, { AxiosError } from 'axios';
//import { RateLimiter } from 'limiter';
//import dotenv from 'dotenv';
//dotenv.config(); // Load environment variables from .env file
//const limiter = new RateLimiter({
//  tokensPerInterval: 1,
//  interval: 2000 // 2 seconds
//});
//const accessToken = process.env.ACCESS_TOKEN; // Access token loaded from environment variables
//if (!accessToken) {
//  console.error('Access token is required');
//  process.exit(1);
//}
//const fetchUserData = async () => {
//  try {
//    await limiter.removeTokens(1);
//    const response = await axios.get(`https://graph.facebook.com/v19.0/me?fields=id,name,last_name&access_token=${accessToken}`);
//    // Log rate limit headers
//    if (response.headers['x-app-usage']) {
//      console.log('X-App-Usage Header:', response.headers['x-app-usage']);
//    }
//    if (response.headers['x-ad-account-usage']) {
//      console.log('X-Ad-Account-Usage Header:', response.headers['x-ad-account-usage']);
//    }
//    console.log(response.data);
//  } catch (error: any) {
//    if (axios.isAxiosError(error)) {
//      const axiosError = error as AxiosError;
//      if (axiosError.response && axiosError.response.status === 429) {
//        const retryAfterHeader = axiosError.response.headers['retry-after'];
//        if (retryAfterHeader) {
//          const retryAfterSeconds = parseInt(retryAfterHeader);
//          if (!isNaN(retryAfterSeconds)) {
//            console.log(`Rate limit exceeded. Retrying after ${retryAfterSeconds} seconds...`);
//            await delay(retryAfterSeconds * 1000); // Wait for the provided number of seconds before retrying
//            await fetchUserData();
//          } else {
//            console.error('Invalid retry-after header:', retryAfterHeader);
//          }
//        } else {
//          console.error('Retry-after header not found in response:', axiosError.response.headers);
//        }
//      } else {
//        console.error('Error fetching user data:', axiosError.response ? axiosError.response.data : axiosError.message);
//      }
//    } else {
//      console.error('Error fetching user data:', error.message);
//    }
//  }
//};
//const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
//const run = async () => {
//  while (true) {
//    await fetchUserData();
//  }
//};
//run();
const axios_1 = __importDefault(require("axios"));
const limiter_1 = require("limiter");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
const limiter = new limiter_1.RateLimiter({
    tokensPerInterval: 1,
    interval: 2000 // 2 seconds
});
const accessToken = process.env.ACCESS_TOKEN; // Access token loaded from environment variables
if (!accessToken) {
    console.error('Access token is required');
    process.exit(1);
}
const fetchUserData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield limiter.removeTokens(1);
        const response = yield axios_1.default.get(`https://graph.facebook.com/v19.0/me?fields=id,name,last_name&access_token=${accessToken}`);
        // Log rate limit headers
        if (response.headers['x-app-usage']) {
            console.log('X-App-Usage Header:', response.headers['x-app-usage']);
        }
        console.log(response.data);
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            const axiosError = error;
            if (axiosError.response && axiosError.response.status === 429) {
                const retryAfterHeader = axiosError.response.headers['retry-after'];
                if (retryAfterHeader) {
                    const retryAfterSeconds = parseInt(retryAfterHeader);
                    if (!isNaN(retryAfterSeconds)) {
                        console.log(`Rate limit exceeded. Retrying after ${retryAfterSeconds} seconds...`);
                        yield delay(retryAfterSeconds * 1000); // Wait for the provided number of seconds before retrying
                        yield fetchUserData();
                    }
                    else {
                        console.error('Invalid retry-after header:', retryAfterHeader);
                    }
                }
                else {
                    console.error('Retry-after header not found in response:', axiosError.response.headers);
                }
            }
            else {
                console.error('Error fetching user data:', axiosError.response ? axiosError.response.data : axiosError.message);
            }
        }
        else {
            console.error('Error fetching user data:', error.message);
        }
    }
});
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    while (true) {
        yield fetchUserData();
    }
});
run();
