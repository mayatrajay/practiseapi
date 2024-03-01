# practiseapi

## Description:
This project is a Node.js CLI application designed to fetch basic user information from the Facebook Graph API. It integrates with Facebook's API using the provided access token and retrieves data such as the user's ID, name, and last name.

## Features:

- Utilizes the axios library for making HTTP requests to the Facebook Graph API.
- Implements rate limiting with the limiter package to adhere to Facebook's API rate limits.
- Retrieves user data from the Facebook API endpoint /me with specified fields.
- Handles rate limit exceeded errors by retrying after the specified time provided in the retry-after header.
- Logs rate limit usage headers (X-App-Usage) for monitoring and optimization.

## Instructions for Use:

- Obtain a Facebook access token by following the provided instructions in the .env file.
- Install dependencies by running npm install.
- Run the application with npm start.

Note: Ensure that the .env file contains the required ACCESS_TOKEN variable for authentication with the Facebook API. Additionally, monitor rate limit usage and adjust the interval or tokens per interval in the limiter configuration as needed to optimize API usage.